import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/config/PrismaClient';
import multer from "multer";
import streamifier from "streamifier";
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("file");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

function runMiddleware(req: Request, res: Response, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export const POST = async (req: Request, res: Response) => {
    try {
        await runMiddleware(req, res, uploadMiddleware);
        const session = await getSession();

        if (!session) {
            return NextResponse.json('Unauthorized', { status: 401 })
        }

        const data = await req.formData();

        if (!data) {
            return NextResponse.json('No error', { status: 404 })
        }

        const image = data.get('posterImage') as File
        const genre = data.get('genres') as string
        const review = data.get('review') as string
        const name = data.get('name') as string
        const score = data.get('score') as string
        const userNickName = data.get('user') as string

        if (!image) {
            return NextResponse.json("Image not found", { status: 404 })
        }
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        let uploadedImage: string | undefined;
        let uploadedImageId: string | undefined;
        const uploadPromise = new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "Movies",
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                        return NextResponse.json('Error', { status: 500 });
                    }

                    resolve(result);
                    uploadedImage = result?.secure_url;
                    uploadedImageId = result?.public_id
                }
            );
            streamifier.createReadStream(buffer).pipe(uploadStream);
        });
        await uploadPromise

        const user = await prisma.user.findFirst({
            where: {
                nickname: userNickName
            }
        })

        if (!user) {
            return NextResponse.json('User not found', { status: 404 });
        }
        const genreId = await prisma.genre.findFirst({
            where: {
                name: genre
            }
        })

        if (!genreId) {
            return NextResponse.json('Genre not found', { status: 404 });
        }

        await prisma.movie.create({
            data: {
                User: { connect: { id: user.id } },
                poster_image: uploadedImage as string,
                poster_image_id: uploadedImageId as string,
                name: name,
                score: parseInt(score),
                critique: review,
                Genre: { connect: { id: genreId?.id } }
            }
        })

        return NextResponse.json('Ok', { status: 200 });
    } catch (err) {

        return NextResponse.json('Error', { status: 500 })
    }

}

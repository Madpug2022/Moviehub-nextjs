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
export const POST = async (req: Request, res: Response, props: any) => {
    await runMiddleware(req, res, uploadMiddleware);
    const { params } = props;
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json('Unauthorized', { status: 401 })
        }

        const { userNickName } = params
        const data = await req.formData();
        const image = data.get('posterImage') as File
        const genre = data.get('genres') as string
        const review = data.get('review') as string
        const name = data.get('name') as string
        const score = data.get('score') as string


        if (!image) {
            return NextResponse.json("Image not found", { status: 404 })
        }
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const upload: any = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: "demo",
                    },
                    (error, result) => {
                        if (error) return console.error(error);
                        return NextResponse.json(result, { status: 200 });
                    }
                );
            streamifier.createReadStream(buffer).pipe(upload);
        })
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
        const newMovie = await prisma.movie.create({
            data: {
                User: { connect: { id: user.id } },
                poster_image: upload.secure_url,
                poster_image_id: upload.public_id,
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

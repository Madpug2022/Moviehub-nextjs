import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/config/PrismaClient';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})
export const POST = async (request: Request, props: any) => {
    const { params } = props;
    const { userNickName } = params
    const data = await request.formData();
    const image = data.get('posterImage') as File
    const genre = data.get('genres') as string
    const review = data.get('review') as string
    const name = data.get('name') as string
    const score = data.get('score') as string
    try {
        const session = await getSession();

        if (!session) {

            return NextResponse.json('Unauthorized', { status: 401 })
        }

        if (!image) {
            return NextResponse.json("Image not found", { status: 404 })
        }
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const upload: any = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: 'Movies' }, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                })
                .end(buffer);
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

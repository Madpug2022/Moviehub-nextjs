import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/config/PrismaClient';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const POST = async (request: NextRequest, props: any) => {
    const { params } = props;
    const { userId } = params
    const data = await request.formData();
    const image = data.get('posterImage') as File
    const genre = data.get('genres') as string
    const review = data.get('review') as string
    const name = data.get('name') as string
    const score = data.get('score') as string
    const imageData = data.get('imageData') as any

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

        if (!bytes || !buffer) {
            return NextResponse.json("Buffer failed", { status: 404 })
        }

        //const upload: any = await new Promise((resolve, reject) => {
        //    cloudinary.uploader
        //        .upload_stream({ folder: 'movie-uploads', upload_preset: 'movie-uploads' }, (err, result) => {
        //            if (err) {
        //                console.log(err);
        //                reject(err);
        //            }
        //            resolve(result);
        //            NextResponse.json('Success')
        //        })
        //        .end(buffer);
        //})
        const upload = await cloudinary.uploader.upload(imageData)
        if (!upload) {
            return NextResponse.json('Error in upload', { status: 404 });
        }
        const user = await prisma.user.findFirst({
            where: {
                nickname: userId
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
        if (!newMovie) {
            return NextResponse.json('Error', { status: 200 });
        }
        return NextResponse.json('Ok', { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json('Error in the code', { status: 500 })
    }
}

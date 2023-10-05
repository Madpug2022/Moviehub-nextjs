import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from '@/config/PrismaClient';
import { deleteImage } from "@/tools/cloudinary";
import { getSession } from '@auth0/nextjs-auth0';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})
export const DELETE = async (response: Response, props: any) => {
    const { params } = props;
    const { movieId } = params;

    try {
        const session = await getSession();

        if (!session) {

            return NextResponse.json('Unauthorized', { status: 401 })
        }
        const targetMovie = await prisma.movie.delete({ where: { id: parseInt(movieId) } })

        if (!targetMovie) { return NextResponse.json('Movie not found', { status: 404 }) }
        else

            await deleteImage(targetMovie?.poster_image_id);


        return NextResponse.json('Movie deleted', { status: 200 })
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}
export const PUT = async (request: Request, props: any) => {
    const { params } = props;
    const { movieId } = params;
    const data = await request.formData();
    const review = data.get('review') as string
    const name = data.get('name') as string
    const score = data.get('score') as string
    try {
        const session = await getSession();

        if (!session) {

            return NextResponse.json('Unauthorized', { status: 401 })
        }
        const updatedMovie = await prisma.movie.update({
            where: {
                id: parseInt(movieId),
            },
            data: {
                name: name,
                score: parseInt(score),
                critique: review
            }
        })
        if (!updatedMovie) {
            return NextResponse.json('Failed to edit movie', { status: 400 })
        }
        return NextResponse.json('Movie edited', { status: 200 })
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}

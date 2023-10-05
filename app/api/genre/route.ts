import { NextResponse, NextRequest } from "next/server";
import prisma from '@/config/PrismaClient';
import { getSession } from '@auth0/nextjs-auth0';
export const POST = async (req: Request) => {
    try {
        const { name } = await req.json();

        const newGenre = await prisma.genre.create({
            data: {
                name: name,
            }
        })
        return NextResponse.json(newGenre, { status: 200 });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

import { NextResponse, NextRequest } from "next/server";
import prisma from '@/config/PrismaClient';

export const POST = async (req: Request, res: Response) => {
    try {
        const { nickname, email, name, picture } = await req.json();
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (user) {
            return NextResponse.json(user, { status: 305 })
        }
        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                nickname: nickname,
                picture: picture
            }
        })
        return NextResponse.json(newUser, { status: 201 })
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }

}
export const GET = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                nickname: true
            }
        })
        return NextResponse.json(users, { status: 200 })
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}

import { NextResponse, NextRequest } from "next/server";
import prisma from '@/config/PrismaClient';

export const GET = async (req: Request, props: any) => {
    const { params } = props;
    try {
        const { userNickName } = params;
        const user = await prisma.user.findUnique({
            where: {
                nickname: userNickName
            },
            include: {
                movies: {
                    select: {
                        id: true,
                        name: true,
                        score: true,
                        critique: true,
                        poster_image: true,
                        poster_image_id: true,
                        Genre: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
        if (!user) {
            return NextResponse.json('Not found', { status: 404 })
        }
        return NextResponse.json(user, { status: 200 })
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }

}

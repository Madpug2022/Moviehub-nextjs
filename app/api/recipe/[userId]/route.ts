import { NextResponse, NextRequest } from "next/server";
import prisma from '@/config/PrismaClient';
import { getSession } from '@auth0/nextjs-auth0';

export const POST = async (req: Request, props: any) => {
    const { params } = props;
    const { userId } = params;
    try {
        const { type, name, link, imageLink } = await req.json();
        const session = await getSession();

        if (!session) {

            return NextResponse.json('Unauthorized', { status: 401 })
        }

        console.log(userId)
        const user = await prisma.user.findFirst({
            where: {
                email: userId
            }
        })
        if (user) {
            await prisma.popcorn.create({
                data: {
                    user: { connect: { id: user.id } },
                    name: name,
                    type: type,
                    link: link,
                    image: imageLink,
                    image_id: imageLink
                }
            })
            return NextResponse.json('Recipe uploaded', { status: 200 })
        } else return NextResponse.json('No user Found', { status: 404 })

    } catch (err) {

        return NextResponse.json('Error found', { status: 500 })
    }
}

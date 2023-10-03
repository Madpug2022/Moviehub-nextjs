import { NextResponse } from "next/server";
import prisma from '@/config/PrismaClient';

export async function GET(req: Request, res: Response) {
    try {
        const brands = await prisma.brand.findMany()
        return NextResponse.json(brands, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

}

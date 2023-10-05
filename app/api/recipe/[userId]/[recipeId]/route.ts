import { NextResponse, NextRequest } from "next/server";
import prisma from '@/config/PrismaClient';
import { getSession } from '@auth0/nextjs-auth0';

export const DELETE = async (response: NextRequest, props: any) => {
    const { params } = props;
    const { recipeId } = params;

    try {
        const session = await getSession();

        if (!session) {

            return NextResponse.json('Unauthorized', { status: 401 })
        }

        const targetRecipe = await prisma.popcorn.delete({ where: { id: parseInt(recipeId) } })

        if (!targetRecipe) { return NextResponse.json('No recipe Found', { status: 404 }) }

        return NextResponse.json('Recipe deleted', { status: 200 })
    } catch (err) {

        console.error("Error deleting recipe:", err);
        return NextResponse.json('Error found', { status: 500 })
    }
}

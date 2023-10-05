import classes from './styles.module.css'
import { FilterInput } from '@/components/filterInput/FilterInput'
import { UploadRecipeModal } from '@/components/uploadRecipeModal/UploadRecipeModal'
import prisma from '@/config/PrismaClient'
import { RecipeCard } from '@/components/recipeCard/RecipeCard'
interface RecipeType {
    id?: number;
    name: string;
    image: string;
    image_id?: string;
    type: string;
    user: any;
    link: string;
}
const Popcorn = async (props: any) => {
    const { searchParams } = props

    const recipes = await prisma.popcorn.findMany({
        include: {
            user: true
        }
    })


    const filteredRecipes: RecipeType | null = await prisma.popcorn.findFirst({
        where: {
            name: searchParams.filter.toString(),
        },
        include: {
            user: true
        }
    })


    return (
        <main className={classes.popcornPage}>
            <FilterInput />
            <div className={classes.popcCContainer}>
                {filteredRecipes &&
                    <RecipeCard
                        name={filteredRecipes?.name}
                        image={filteredRecipes?.image}
                        link={filteredRecipes?.link}
                        type={filteredRecipes?.type}
                        id={filteredRecipes?.id}
                        user={filteredRecipes?.user.nickName}
                    />
                }
                {
                    !filteredRecipes &&
                    recipes.map((recipe) => {
                        return (
                            <RecipeCard key={recipe.id}
                                id={recipe.id}
                                name={recipe.name}
                                image={recipe.image}
                                type={recipe.type}
                                link={recipe.link}
                                user={recipe.user.email}
                            />
                        )
                    })
                }
            </div>
            <div className={classes.popcLogo}>
                <UploadRecipeModal />
            </div>
        </main>
    )
}
export default Popcorn

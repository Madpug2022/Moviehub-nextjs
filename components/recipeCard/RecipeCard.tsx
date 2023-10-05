'use client'

import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import classes from './recipeCard.module.css'
import Image from "next/image";
interface RecipeType {
    id?: number;
    name: string;
    image: string;
    image_id?: string;
    type: string;
    user: any;
    link: string;
}
export const RecipeCard = (props: RecipeType) => {
    const { id, type, image, name, user, link } = props;
    const { user: loggedUser } = useUser()
    const router = useRouter();
    const URL = process.env.NEXT_PUBLIC_URL_RECIPES

    const handleDelete = async () => {
        toast.warning('Recipe removed successfully')
        await fetch(URL + `/${user}/${id}`, {
            method: 'DELETE',
        })
        router.refresh()
    }

    return (
        <div className={classes.recipeCard}>
            <div>
                <p className={classes.rcType}>{`${type} recipe`}</p>
                {loggedUser?.email == user && <button onClick={() => handleDelete()}><BsTrash /></button>}
            </div>
            <div className={classes.rcTop}>
                <Image
                    height={200}
                    width={200}
                    src={image}
                    alt="Banner for recipe"
                />
            </div>
            <div className={classes.rcMid}>
                <p>{name}</p>
                <p>{`Uploaded by ${user}`}</p>
            </div>
            <div className={classes.rcBot}>
                <a href={link} target="_blank">Go to the recipe website</a>
            </div>
        </div>
    )
}

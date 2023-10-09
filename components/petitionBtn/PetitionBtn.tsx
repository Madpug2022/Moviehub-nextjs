'use client'
import classes from './petitionBtn.module.css'
import { RxTrash } from "react-icons/rx";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";

interface PropType {
    action: 'delete' | 'edit'
    movieId: number
    userId: string
}


export const PetitionBtn = (props: PropType) => {
    const { action, movieId, userId } = props;
    const router = useRouter()

    const handleAction = async () => {
        const URL = process.env.NEXT_PUBLIC_URL_MOVIE || ''
        if (action == 'delete') {
            await fetch(`${URL}/${userId}/${movieId}`, {
                method: 'DELETE',
            })
            toast.error('Movie deleted successfully')
            router.refresh();
            router.push(`/movies/${userId}?genre=all`)
        }
    }

    return (
        <button style={action == 'delete' ? { backgroundColor: '#C41C19' } : { backgroundColor: 'transparent' }} onClick={() => { handleAction() }} className={classes.petitionBtn}>{action == 'delete' ? <RxTrash /> : <p>Not</p>}</button>
    )
}

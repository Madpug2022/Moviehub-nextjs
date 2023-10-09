'use client'
import { useForm } from "react-hook-form";
import classes from './editForm.module.css'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

interface FormData {
    name: string
    score: number
    review: string | null
    movieId: number
    userId: string
}

export const EditForm = (props: FormData) => {
    const { name, score, review, userId, movieId } = props;
    const router = useRouter();
    const { formState: { errors }, register, handleSubmit } = useForm({ defaultValues: { name, score, review } })

    const onSubmit = async (data: any) => {
        const URL = process.env.NEXT_PUBLIC_URL_MOVIE || ''
        const upload = new FormData();
        upload.append('name', data.name)
        upload.append('score', data.score.toString())
        upload.append('review', data.review)
        await fetch(`${URL}/${userId}/${movieId}`, {
            method: 'PUT',
            body: upload
        })
        toast.success('Movie Edited successfully')
        router.refresh();
        router.push('?')
    }

    return (
        <form className={classes.editForm} onSubmit={handleSubmit(onSubmit)}>
            <h2>Edit information</h2>
            <div>
                <label htmlFor="name">New Tittle</label>
                <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    {...register('name', {
                        maxLength: 100
                    })}
                />
                {errors.name?.type === 'maxLength' && <p>Field has to be maximum of 100 characters.</p>}
            </div>
            <div>
                <label htmlFor="score">New Score</label>
                <input
                    type="number"
                    id="score"
                    {...register('score', {
                        min: 1,
                        max: 10
                    })}
                />
                {errors.score?.type === 'min' && <p>Minimun score is 1</p>}
                {errors.score?.type === 'max' && <p>Maximun score is 10</p>}
            </div>
            <div>
                <label htmlFor="review">New Review</label>
                <textarea
                    id="review"
                    autoComplete="off"
                    {...register('review', {
                        maxLength: 2500
                    })}
                    rows={2}
                    cols={50}
                    style={{ resize: 'none' }}
                />
                {errors.review?.type === 'maxLength' && <p>Field has to be maximum of 2500 characters.</p>}
            </div>
            <div>
                <button onClick={() => router.push('?')}>Cancel</button>
                <input className={classes.editBtnSend} type="submit" value='Confirm' />
            </div>
        </form>
    )
}

'use client'
import Link from 'next/dist/client/link';
import { RxCross2, RxTrash, RxPencil2 } from "react-icons/rx";
import { useUser } from '@auth0/nextjs-auth0/client';
import classes from './controlBar.module.css'
import { PetitionBtn } from '@/components/petitionBtn/PetitionBtn';
import { CircularProgress } from '@mui/material';

interface PropType {
    confirm: string;
    movieId: number;
    userId: string;
}

const ControlBar = (props: PropType) => {
    const { userId, movieId, confirm } = props
    const { user } = useUser()

    return (
        userId == user?.nickname ? (
            <div className={classes.mdTop}>
                {confirm !== 'confirmDelete' && (
                    <Link href={`?confirm=confirmDelete`} className={classes.mdButton}><RxTrash /></Link>
                )}
                {confirm ? <PetitionBtn action={'delete'} movieId={movieId} userId={userId} /> : null}
                {confirm && (
                    <Link href={`?`} className={classes.mdButton}><RxCross2 /></Link>
                )}
                <Link href={`?edit=confirmEdit`} className={classes.mdButton}><RxPencil2 /></Link>
            </div>
        ) : <></>
    )
}

export default ControlBar

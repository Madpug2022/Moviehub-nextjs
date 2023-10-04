'use client'
import classes from './uploadBtn.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation'
interface PropType {
    endpoint: string
    name: string
    userId: string
}
const UploadBtn = (props: PropType) => {
    const { endpoint, name, userId } = props
    const { user } = useUser();

    const router = useRouter();

    return (userId == user?.nickname ?
        <button className={classes.uploadBtn} onClick={() => { router.push(`/${endpoint}`) }} >{name}</button>
        :
        <CircularProgress />
    )
}

export default UploadBtn

'use client'
import classes from './joinBtn.module.css'
import { useRouter } from 'next/navigation'
const JoinBtn = () => {
    const router = useRouter()
    return (
        <button className={classes.joinBtn} onClick={() => { router.push('/api/auth/login') }}>Join for free</button>
    )
}

export default JoinBtn

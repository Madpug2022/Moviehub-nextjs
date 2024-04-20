'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import classes from './joinBtn.module.css'
import { useRouter } from 'next/navigation'
const JoinBtn = () => {
    const router = useRouter()
    const { user } = useUser();
    return (
        <button className={classes.joinBtn} onClick={() => { router.push(user ? '/movies' : '/api/auth/login') }}>
            {user ? 'The Watchlist' : 'Join for Free'}
        </button>
    )
}

export default JoinBtn

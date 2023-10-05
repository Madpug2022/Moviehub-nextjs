'use client'
import { useRouter } from "next/navigation"
import classes from './styles.module.css'
const MoviePage = async () => {
    const router = useRouter()
    return (
        <main className={classes.loginPage}>
            <div className={classes.lMessageContainer}>
                <div className={classes.lMessage}>
                    <p>You must be logged in to access your movies or series. Please </p><button onClick={() => router.push('/api/auth/login')}>Log in</button>
                    <span> or if you are not a member </span>
                    <button> Register</button>
                </div>
            </div>
        </main>
    )
}
export default MoviePage

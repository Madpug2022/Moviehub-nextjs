'use client'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

const MoviePage = () => {
    const { user } = useUser();
    const router = useRouter();
    return (
        user ? router.push(`/movies/${user.nickname}`) : router.push('/private')
    )
}
export default MoviePage

'use client'
import classes from './moviecomponent.module.css'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import * as logos from '@/public/resources/score logos/index'

interface MediaType {
    id: string
    name: string
    poster_img: string
    score: number
    genres: string
    critique: string
    user?: string
}

const MovieComponent = (props: MediaType) => {
    const { id: movieId, name, poster_img, score, user } = props;
    const router = useRouter();

    return (
        <div className={classes.movieCard} >
            <div className={classes.movieCardBack} style={{ background: `url(${poster_img})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: ' bottom center' }} />
            <div className={classes.cardInfo} onClick={() => { router.push(`/movies/${user}/${movieId}`) }}>
                <div className={classes.cardInfoTop}><p>{name}</p></div>
                <div className={classes.cardInfoBot}>
                    <div className={classes.score}>
                        <span>{score}</span><span> out of 10</span>
                    </div>
                    <div className={classes.scoreLogo}>
                        <Image className={classes.scoreImg} src={(score <= 5) ? logos.c3 : (score <= 8) ? logos.c4 : logos.c5} alt="Score_logo" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MovieComponent

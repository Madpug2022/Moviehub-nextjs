import classes from './styles.module.css'
import Link from 'next/link';
import { Suspense } from 'react';
import prisma from '@/config/PrismaClient';
import UploadBtn from '@/components/uploadBtn/UploadBtn';
import { CircularProgress } from '@mui/material';
import MovieComponent from '@/components/movieComponent/MovieComponent';

interface GenreType {
    id?: string;
    name: string;
    moviesId?: string[]
}
interface MovieType {
    id: string;
    name: string;
    poster_image: string;
    poster_image_id: string;
    score: number;
    critique: string;
    Genre: GenreType;
}

const loadMovies = async (userId: string) => {
    const dinamicData = await fetch(`http://localhost:3000/api/user/${userId}`, { cache: 'no-store' });
    const data = await dinamicData.json();
    const movieData = data.movies;
    return movieData
}

const UserMoviePage = async (props: any) => {
    const { params, searchParams } = props;
    const selectedGenre = searchParams.genre;

    const genres = await prisma.genre.findMany()

    const movieData = await loadMovies(params.userId)

    const filtered = movieData.filter((movie: MovieType) => movie.Genre.name == selectedGenre)

    return (
        <main className={classes.moviePageContainer}>
            <div className={classes.moviePcLeft}>
                <div className={classes.mplTittle}>
                    <h2 style={{ fontSize: '20px' }}>Hello {`${params.userId}`}</h2>
                </div>
                <Suspense fallback={<CircularProgress />}>
                    <div className={classes.categoryContainer}>
                        <Link href={`?genre=all`} className={classes.categoryBtn}>
                            All
                        </Link>
                        {genres.map(genre => (
                            <Link href={`?genre=${genre.name}`} key={genre.id} className={selectedGenre == genre.name ? classes.categoryBtnSelected : classes.categoryBtn}>
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                </Suspense>
                <UploadBtn userId={params.userId} endpoint={`movies/${params.userId}/upload`} name={'Upload'} />
            </div>
            <div className={classes.MoviePcRight}>

                <Suspense fallback={<CircularProgress />}>
                    {selectedGenre == 'all' || undefined ?
                        movieData.map((movie: MovieType) =>

                        (
                            <MovieComponent
                                key={movie.id}
                                user={params.userId}
                                id={movie.id}
                                genres={movie.Genre.name}
                                critique={movie.critique}
                                name={movie.name}
                                poster_img={movie.poster_image}
                                score={movie.score}
                            />)
                        ) :
                        filtered.map((movie: MovieType) =>

                        (
                            <MovieComponent
                                key={movie.id}
                                user={params.userId}
                                id={movie.id}
                                genres={movie.Genre.name}
                                critique={movie.critique}
                                name={movie.name}
                                poster_img={movie.poster_image}
                                score={movie.score}
                            />)
                        )
                    }
                </Suspense>

            </div>
        </main>
    )
}
export default UserMoviePage

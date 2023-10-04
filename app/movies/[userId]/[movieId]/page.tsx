import classes from './styles.module.css'
import prisma from '@/config/PrismaClient';
import { Suspense } from 'react';
import { Image } from 'next/dist/client/image-component';
import { CircularProgress } from '@mui/material';
import ControlBar from '@/components/controlBar/ControlBar';
import { EditForm } from '@/components/editForm/EditForm';

const DetailsPage = async (props: any) => {
    const { params, searchParams } = props;

    const movieData = await prisma.movie.findUnique({
        where: {
            id: parseInt(params.movieId)
        }
    })

    return (
        <main className={classes.detailsPage}>
            <Suspense fallback={<CircularProgress />}>
                <div className={classes.mdBackground}>
                    <div className={classes.mdContainer}>
                        {movieData && <ControlBar confirm={searchParams.confirm} movieId={movieData.id} userId={params.userId} />}
                        <div className={classes.reviewInfo} >
                            <div className={classes.reviewInfoLeft}>
                                {!searchParams.edit ? <section className={classes.mdInfo}>
                                    {movieData && <Suspense fallback={<CircularProgress />}>
                                        <h2>User Review</h2>
                                        <div>
                                            <p style={movieData.score >= 8 ? { backgroundColor: '#57e32c' } : movieData.score >= 5 ? { backgroundColor: '#ffe234' } : { backgroundColor: '#ff4545' }}>{movieData.score}</p>
                                            <p>{params.userId}</p>
                                            <p>{movieData.name}</p>
                                        </div>
                                        <p>{movieData.critique}</p>
                                    </Suspense>}
                                </section>
                                    :

                                    <section className={classes.mdInfo}>
                                        {movieData && <EditForm name={movieData.name} score={movieData.score} review={movieData.critique} movieId={movieData.id} userId={params.userId} />}
                                    </section>}
                            </div>
                            <div className={classes.reviewInfoRigth}>
                                <Suspense fallback={<CircularProgress />}>
                                    {movieData &&
                                        <Image
                                            className={classes.movieCover}
                                            src={movieData?.poster_image}
                                            width={400}
                                            height={600}
                                            alt='Cover Image for movie'

                                        />}
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        </main>
    )
}
export default DetailsPage

import classes from './styles.module.css'
import background from '@/public/resources/film-movie-filmmaker-movie-director-wallpaper-7980187d710a0dbbd6e768ef7001360d.jpg'
import UploadForm from '@/components/uploadForm/UploadForm';
import prisma from '@/config/PrismaClient';
import Image from 'next/image';

const UploadPage = async (props: any) => {
    const { params } = props;
    const genres = await prisma.genre.findMany()
    return (
        <main className={classes.uploadPage}>
            <div className={classes.uploadSection}>
                <Image
                    src={background}
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                    className={classes.backgroundImg}
                />
                <UploadForm genres={genres} userId={params.userId} />
            </div>
        </main>
    )
}
export default UploadPage

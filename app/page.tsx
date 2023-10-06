import ChangingBackground from '@/components/changingBackground/ChangingBackground'
import classes from './style.module.css'
import Image, { StaticImageData } from 'next/image'
import logo from '@/public/resources/Logo Popcorn.jpg'
import JoinBtn from '@/components/joinBtn/JoinBtn'
import { Suspense } from 'react'
import Publicity from '@/components/publicity/Publicity'
import { SpinnerCircular } from 'spinners-react'
import BrandLogo from '@/components/brandLogo/BrandLogo'
import popcorn from '@/public/resources/popcorn-ico.jpg'
import premiumMember from '@/public/resources/Premium-member.jpg'
import prisma from '@/config/PrismaClient'

interface BrandType {
    id: number
    img: string
    href: string
}
interface PublicityType {
    id: number
    title: string
    content: string
    image: StaticImageData
    order: string
    background: string
}
const publicity: PublicityType[] = [
    {
        id: 1,
        title: "Enjoy Premium",
        content: "Become a premium member now and enjoy the benefits: Share your opinion with the world and check other users opinions!",
        image: premiumMember,
        order: 'row',
        background: '#2d545e'
    },
    {
        id: 2,
        title: "Wanna learn to make Popcorn?",
        content: 'Read our recipes and enjoy the best popcorn ever!',
        image: popcorn,
        order: 'reverse-row',
        background: '#ff1d58'
    }
]

const MainPage = async () => {
    const brands: BrandType[] = await prisma.brand.findMany()
    return (
        <main>
            <section className={classes.mainWrapper}>
                <ChangingBackground />
                <Image
                    src={logo}
                    alt='Logo for popcorn'
                    className={classes.logoPopcorn}
                />
                <h1>If you can't enjoy it with Popcorn then you should forget it.</h1>
                <h3>With Popcorn you can track a record of the movies and series you watch.<br /> Discover new ones. Share opinions and more.</h3>
                <JoinBtn />
                <p>ENJOY YOUR SERIES ON</p>
                <div>
                    {brands.map((brand: BrandType) => {
                        return (
                            <Suspense key={brand.id} fallback={<SpinnerCircular
                                size={75}
                                color="#f1f1f1" />}>
                                <BrandLogo
                                    id={brand.id.toString()}
                                    img={brand.img}
                                    href={brand.href}
                                />
                            </Suspense>
                        )
                    })}
                </div>
            </section>
            <Publicity id={publicity[0].id} background={publicity[0].background} title={publicity[0].title} content={publicity[0].content} image={publicity[0].image} order={publicity[0].order} />
            <Publicity id={publicity[1].id} background={publicity[1].background} title={publicity[1].title} content={publicity[1].content} image={publicity[1].image} order={publicity[1].order} />
        </main>
    )
}
export default MainPage

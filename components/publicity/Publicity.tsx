'use client'
import classes from './publicity.module.css'
import Image, { StaticImageData } from 'next/image'

interface PublicityType {
    id: number
    title: string
    content: string
    image: StaticImageData
    order: string
    background: string
}
const Publicity = (props: PublicityType) => {
    const { image, title, content, order, background } = props;
    return (
        <section style={{ backgroundColor: `${background}` }} className={classes.publicitySection}>
            <div style={{ flexDirection: order === 'row' ? `row` : `row-reverse` }} className={classes.publicityContainer}>
                <div>
                    <Image
                        src={image}
                        alt='Publicity logo'
                        className={classes.publicityImage}
                        style={{ transform: order === 'row' ? 'rotate(-8deg)' : 'rotate(8deg)' }}
                    />
                </div>
                <div className={classes.publicityRigth}>
                    <h3>{title}</h3>
                    <p>{content}</p>
                </div>
            </div>
        </section>
    )
}

export default Publicity

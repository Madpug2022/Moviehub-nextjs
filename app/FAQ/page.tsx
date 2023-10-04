import classes from './styles.module.css'
import * as stepsImages from '@/public/resources/steps/index'
import { StaticImageData } from 'next/dist/shared/lib/get-img-props'
import Publicity from '@/components/publicity/Publicity'
interface StepsType {
    id: number
    title: string
    content: string
    image: StaticImageData
    order: string
    background: string
}
const steps: StepsType[] = [
    {
        id: 1,
        title: "Step 1: Access our page",
        content: "You can access to the Movies or Series tag by logging in, there you will be able to load your favourites movies!",
        image: stepsImages.step1,
        order: 'row',
        background: '#0E0016'
    },
    {
        id: 2,
        title: "Step 2: Load something",
        content: "By pressing UPLOAD a modal will open so you can fill the data of the media you will upload!",
        image: stepsImages.step2,
        order: 'reverse-row',
        background: '#0E0016'
    },
    {
        id: 3,
        title: "Step 3: Fill the data",
        content: "Fill the tittle, score, review, and image field, pick a genre and upload your critique. It will take a few seconds to reload.",
        image: stepsImages.step3,
        order: 'row',
        background: '#0E0016'
    },
    {
        id: 4,
        title: "Step 4: Success!",
        content: "You did it! Now you can do the same as many times you want. You can also press en the card to see details, edit or even delete your reviews.",
        image: stepsImages.step4,
        order: 'reverse-row',
        background: '#0E0016'
    },
]
const FAQ = () => {
    return (
        <main className={classes.faqPage}>
            {steps.map((step) => {
                return (
                    <Publicity key={step.id}
                        id={step.id}
                        image={step.image}
                        title={step.title}
                        content={step.content}
                        order={step.order}
                        background={step.background}
                    />
                )
            })}
        </main>
    )
}
export default FAQ

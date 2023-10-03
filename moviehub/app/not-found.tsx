import Publicity from "@/components/publicity/Publicity"
import error from '@/public/resources/360_F_124253296_1WFcs6utp8pSaIfdfqvOXnppOJG3jHZa.jpg'
import { StaticImageData } from "next/image"
import classes from './style.module.css'
interface ErrorType {
    id: number
    title: string
    content: string
    image: StaticImageData
    order: string
    background: string
}
const errorData: ErrorType =
{
    id: 1,
    title: "Error 404",
    content: "The Page you are trying to access does not exist",
    image: error,
    order: 'row',
    background: '#a014f1'
}

export default function NotFound() {
    return (
        <main className={classes.notFoundPage}>
            <Publicity
                id={errorData.id}
                title={errorData.title}
                content={errorData.content}
                image={errorData.image}
                order={errorData.order}
                background={errorData.background}
            />
        </main>
    )
}

'use client'
import Image, { StaticImageData } from "next/image"
import classes from './changingBackground.module.css'
import * as images from '@/public/resources/index'
import { useState, useEffect } from "react"

type BackgroundsType = {
    [key: string]: StaticImageData;
};
const backgrounds: BackgroundsType = images
const ChangingBackground = () => {
    const [background, setBackground] = useState<StaticImageData>(backgrounds.c1);

    function changeBackground() {
        const keys = Object.keys(backgrounds);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        setBackground(backgrounds[randomKey]);
    }

    useEffect(() => {
        const change = setInterval(changeBackground, 8000);
        return () => { clearInterval(change) }
    }, [])

    return (
        <Image
            className={classes.cBackground}
            src={background}
            alt="Background"
        />
    )
}

export default ChangingBackground

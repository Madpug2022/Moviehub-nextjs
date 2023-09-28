'use client'
import { useState } from "react";
import classes from './brandLogo.module.css'

interface BrandType {
    id: string
    img: string
    href: string
}

const BrandLogo = (props: BrandType) => {
    const { id, img, href } = props
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div className={classes.brandLinkWrapper} key={id} style={isHovered ? { filter: 'brightness(120%)' } : { filter: 'brightness(50%)' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <a className={classes.brandLink} href={href}>
                <img className={classes.brandImg} src={img} alt={`Brand logo for ${id}`} />
            </a>
        </div>
    );
};

export default BrandLogo;

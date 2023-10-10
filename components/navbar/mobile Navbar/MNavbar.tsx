'use client'
import React from 'react';
import classes from './mNavbar.module.css'
import { AiFillHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { BiMovie } from "react-icons/bi";
import { PiPopcornBold } from "react-icons/pi";
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link'


interface NavLinks {
    id: number,
    icon: React.ReactNode
    link: string
}

const MNavbar = () => {
    const { user } = useUser()

    const links: NavLinks[] = [
        {
            id: 1,
            icon: <AiFillHome />,
            link: '/'
        },
        {
            id: 2,
            icon: <BiMovie />,
            link: `/movies/${user?.nickname}?genre=all`
        },
        {
            id: 3,
            icon: <PiPopcornBold />,
            link: '/popcorn?filter='
        },
        {
            id: 4,
            icon: <AiOutlineQuestionCircle />,
            link: '/FAQ'
        }

    ]
    return (
        <nav className={classes.mobileNavigationBar}>
            <div className={classes.mNavContainer}>
                {links.map(link => {
                    return (
                        <Link className={classes.mNavLink} key={link.id} href={link.link}>{link.icon}</Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default MNavbar;

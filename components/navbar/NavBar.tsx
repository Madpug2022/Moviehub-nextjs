'use client'
import classes from './navbar.module.css'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../../public/resources/Logo Popcorn.jpg'
import { PiPersonArmsSpreadBold } from "react-icons/pi";
import { useRouter } from 'next/navigation'
import { Nova_Round } from 'next/font/google'
import { CircularProgress } from '@mui/material';
import SearchButton from '../searchButton/SearchButton';
import placeholderLogo from '@/public/resources/bw logo.jpg'
import createUser from '@/tools/createUser';


const nova = Nova_Round({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin']
})

const Links_Left = [
    {
        id: 1,
        to: `/movies`,
        name: 'The Watchlist'
    },

]
const Links_Rigth = [
    {
        id: 2,
        to: '/FAQ',
        name: 'FAQ'
    },
    {
        id: 3,
        to: `/popcorn?filter=`,
        name: 'Snack Bar'
    }
]

const NavBar = () => {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [notOnMain, setNotOnMain] = useState(false);
    const URL = process.env.NEXT_PUBLIC_URL_USERS || ''
    useEffect(() => {
        if (user) {
            createUser(URL, user)
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    return (
        <nav className={classes.navigationBar} style={isScrolled || notOnMain ? { backgroundColor: 'black' } : { backgroundColor: '' }}>
            <div className={classes.lateralNav}>
                <SearchButton setNotOnMain={setNotOnMain} />
            </div>

            <div className={`${classes.centerNav} ${nova.className}`} >
                <div className={classes.navLinks}>{Links_Left.map(link => {
                    return (
                        <Link className={classes.navLink} onClick={() => { setNotOnMain(true) }} key={link.id} href={user ? `${link.to}/${user?.nickname}?genre=all` : `${link.to}`}>{link.name}</Link>
                    )
                })}</div>

                <Image
                    src={logo}
                    alt='Logo for Popcorn'
                    className={classes.popLogo}
                    onClick={() => { router.push('/'); setNotOnMain(false) }}
                    style={isScrolled || notOnMain ? { display: 'block' } : { display: 'none' }}
                />

                <div className={classes.navLinks}>{Links_Rigth.map(link => {
                    return (
                        <Link className={classes.navLink} onClick={() => { setNotOnMain(true) }} key={link.id} href={link.to}>{link.name}</Link>
                    )
                })}</div>
            </div>
            {isLoading ? <CircularProgress />
                :
                <div className={classes.lateralNav}>
                    {user &&
                        <>
                            <button className={classes.logOutBtn} onClick={() => { router.push('/api/auth/logout') }}>
                                LOGOUT
                            </button>
                            <Image src={user?.picture || placeholderLogo} alt='user-logo' className={classes.userLogo} width={55} height={55} />
                        </>}
                    {!user &&
                        <button className={classes.loginBtn} onClick={() => { router.push('/api/auth/login') }}>
                            <PiPersonArmsSpreadBold />
                        </button>}
                </div>}
        </nav>
    )
}
export default NavBar

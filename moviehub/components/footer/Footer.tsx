import classes from './footer.module.css'
import Image from 'next/image';
import logo from '@/public/resources/bw logo.jpg'
import { AiFillLinkedin, AiFillGithub, AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
const fLinks: string[] = ['About', 'Forums', 'FAQs', 'Terms', 'Privacy'];
const Footer = () => {
    return (
        <footer>
            <div className={classes.footerContainer}>
                <div className={classes.FCTop}>
                    {fLinks.map((link) => {
                        return (
                            <a className={classes.FLink} key={link} href="/" target="_blank">{link}</a>)
                    })}
                    <div>
                        <a className={classes.FLink} href="https://github.com/Madpug2022" target="_blank"><AiFillGithub /></a>
                        <a className={classes.FLink} href="https://www.instagram.com/matias.chiappa/" target="_blank"><AiFillInstagram /></a>
                        <a className={classes.FLink} href="https://www.linkedin.com/in/matias-alaimo-chiappa-910560230/" target="_blank"><AiFillLinkedin /></a>
                        <a className={classes.FLink} href="https://twitter.com/?lang=es" target="_blank"><AiFillTwitterCircle /></a>
                    </div>
                </div>
                <div className={classes.FCBottom}>
                    <Image
                        src={logo}
                        alt='Logo popcorn'
                        className={classes.BWLogo}
                    />
                    <p>© 2023 Popcorn, inc. All rights reserved.
                        Hand crafted in Westeros and distributed in Highgarden Area.</p>
                    <button className={classes.signatureBtn} />
                </div>

            </div>
        </footer>
    )
}
export default Footer

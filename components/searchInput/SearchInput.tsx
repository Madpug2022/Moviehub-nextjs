'use client'
import classes from './searchInput.module.css'
import { PiMagnifyingGlassFill } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import react, { useState, useEffect } from 'react';
import logo from '@/public/resources/popcorn-ico.jpg'
import { Image } from 'next/dist/client/image-component';
import Link from 'next/dist/client/link';

interface PropType {
    setNotOnMain: (state: boolean) => void
}
interface UserData {
    id: number
    nickname: string
}

const SearchInput = (props: PropType) => {
    const [userData, setUserData] = useState<UserData[]>([])
    const [filteredUsers, setFilteredUsers] = useState<UserData[]>([])
    const { setNotOnMain } = props;
    useEffect(() => {
        const fetchUsers = async () => {
            const URL = process.env.NEXT_PUBLIC_URL_USERS || ''
            const response = await fetch(URL);
            const data = await response.json();
            setUserData(data)
        }
        fetchUsers();
    }, [])


    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();


    //Filter users
    useEffect(() => {
        const filtered = userData.filter((user) => user.nickname.includes(searchQuery))
        setFilteredUsers(filtered);

    }, [searchQuery]);

    const handleSubmit = (event: react.FormEvent) => {
        event.preventDefault();
        router.push(`/movies/?name=${searchQuery}?genre=all`)
    }
    return (
        <div className={classes.searchBar}>
            <form className={classes.searchForm} onSubmit={handleSubmit}>
                <input style={{ width: '50vh' }} placeholder='Search User' value={searchQuery} onChange={(event) => setSearchQuery(event?.target.value)} />
                {searchQuery !== '' && userData.length > 0 && <div className={classes.userSearchList}>
                    <ul>
                        {filteredUsers.map(user => (
                            <div><Image src={logo} alt='Popcorn Ico' height={25} width={25} style={{ borderRadius: '50%' }} /><Link className={classes.searchresult} key={user.id} href={`/movies/${user.nickname}`}>{user.nickname}</Link></div>
                        ))}
                    </ul>
                </div>}
                <button className={classes.submitSearchBtn} type='submit' onClick={() => setNotOnMain(true)}>
                    <PiMagnifyingGlassFill />
                </button>
            </form>
        </div>
    )
}

export default SearchInput

'use client'
import classes from './searchInput.module.css'
import { PiMagnifyingGlassFill } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import react, { useState } from 'react';

interface PropType {
    setNotOnMain: (state: boolean) => void
}

const SearchInput = (props: PropType) => {
    const { setNotOnMain } = props;

    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (event: react.FormEvent) => {
        event.preventDefault();
        router.push(`/movies/?name=${searchQuery}`)
    }
    return (
        <div className={classes.searchBar}>
            <form className={classes.searchForm} onSubmit={handleSubmit}>
                <input style={{ width: '50vh' }} placeholder='Search User' value={searchQuery} onChange={(event) => setSearchQuery(event?.target.value)} />
                <button className={classes.submitSearchBtn} type='submit' onClick={() => setNotOnMain(true)}>
                    <PiMagnifyingGlassFill />
                </button>
            </form>
        </div>
    )
}

export default SearchInput

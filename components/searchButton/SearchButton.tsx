'use client'

import { PiMagnifyingGlassFill } from "react-icons/pi";
import { useState } from "react";
import classes from './searchbutton.module.css'
import SearchInput from "../searchInput/SearchInput";

interface PropType {
    setNotOnMain: (state: boolean) => void
}

const SearchButton = (props: PropType) => {
    const [open, setOpen] = useState(false)
    const { setNotOnMain } = props;
    return (
        <div className={classes.searchContainer}>
            <button
                className={open ? `${classes.searchButtonOpen}` : `${classes.searchButton}`}
                onClick={() => { setOpen(!open) }}
            >
                <PiMagnifyingGlassFill />
                {!open && <span>SEARCH</span>}
            </button>
            {open && <SearchInput setNotOnMain={setNotOnMain} />}
        </div>
    )
}

export default SearchButton

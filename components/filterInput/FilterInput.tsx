'use client'

import { useState, useEffect } from "react"
import classes from './filterInput.module.css'
import { useRouter } from "next/dist/client/components/navigation"

export const FilterInput = () => {
    const [focused, setFocused] = useState<boolean>(false)
    const [filter, setFilter] = useState<string>('')
    const router = useRouter();

    useEffect(() => {
        router.push(`?filter=${filter}`)
    }, [filter])

    return (
        <div className={`${classes.popcSearchbar} ${focused ? `${classes.focused}` : ''}`}>
            <input
                type="text"
                placeholder='Filter the recipes'
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />

        </div>
    )
}

import classes from './styles.module.css'
import { FilterInput } from '@/components/filterInput/FilterInput'

const Popcorn = (props: any) => {
    const { searchParams } = props
    console.log(searchParams)
    return (
        <main className={classes.popcornPage}>
            <FilterInput />
            <div >

            </div>
        </main>
    )
}
export default Popcorn

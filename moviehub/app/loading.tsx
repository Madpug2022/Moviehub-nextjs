import { SpinnerCircular } from "spinners-react"
const Loading = () => {
    return (
        <SpinnerCircular
            size={150}
            color="#f1f1f1"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        />
    )
}
export default Loading

import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const WithGuard = (Component) => {
    function Wrapper(props) {
        const { token } = useSelector((state) => state.user)
        return token ? <Component {...props} /> : <>
            <p className=" text-red-700">Please Login first</p>
            <Link to='/login'>Log in</Link>
        </>

    }
    return (
        Wrapper
    )
}

export default WithGuard
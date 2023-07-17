import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const WithGuard = (Component) => {
    function Wrapper(props) {
        const { token } = useSelector((state) => state.user)
        return token ? <Component {...props} /> : <>
            <p className="text-red-700 text-center text-4xl p-6">Please Login first...</p>
            <Link className=" bg-blue-500 text-white hover:bg-blue-600 transition rounded-md px-2 py-4 w-3/4 m-auto text-center" to='/login'>Log in</Link>
        </>

    }
    return (
        Wrapper
    )
}

export default WithGuard
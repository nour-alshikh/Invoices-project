import { CiMenuBurger } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../rtk/slices/userSlice'
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ setShowMenu }) => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { token } = useSelector((state) => state.user)

    const handleLogout = () => {

        dispatch(logout()).unwrap().then(() => {
            navigate('/login')
        })
    }
    return (
        <div className="shadow-lg z-10 relative py-4 px-4 flex justify-between items-center">
            <Link to='/invoices'>Home</Link>
            <div className="md:hidden cursor-pointer" onClick={() => setShowMenu(true)} >
                <CiMenuBurger fontSize={24} />
            </div>
            {
                token && (
                    <button className="p-2 bg-red-500 text-white rounded-md" onClick={handleLogout}>
                        Logout
                    </button>
                )
            }

        </div>
    )
}

export default Navbar
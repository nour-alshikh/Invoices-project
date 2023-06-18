import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";

const Navbar = ({ setShowMenu }) => {
    return (
        <div className="shadow-lg z-20 relative py-4 px-4">
            <Link>Home</Link>
            <div className="md:hidden cursor-pointer" onClick={() => setShowMenu(true)} >
                <CiMenuBurger fontSize={24} />
            </div>
        </div>
    )
}

export default Navbar
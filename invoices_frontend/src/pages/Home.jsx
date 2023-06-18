
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { logout } from '../rtk/slices/userSlice'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import Dashboard from './Dashboard'
import Sidebar from '../components/Sidebar'
import Invoices from './invoices/Invoices'
import Sections from './Sections'
import EditSection from '../components/EditSection'

const Home = () => {
    const [showMenu, setShowMenu] = useState(false)
    const { user } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleLogout = () => {

        dispatch(logout()).unwrap().then(() => {
            navigate('/login')
        })
    }

    return (
        // <div>
        //     {user?.name}
        //     <button className="p-4 bg-red-500 text-white" onClick={handleLogout}>
        //         Logout
        //     </button>
        // </div>
        <>
            <div className='flex flex-row w-screen'>

                <div className='hidden md:flex w-1/5 h-screen flex-initial'>
                    <Sidebar user={user} />
                </div>

                {showMenu &&
                    <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10'>
                        <div onClick={() => setShowMenu(false)} className='cursor-pointer'>
                            <IoCloseCircleOutline />
                        </div>
                        <Sidebar user={user} />
                    </div>
                }

                <div className=' h-screen flex-1 overflow-y-scroll'>
                    <Navbar showMenu={showMenu} setShowMenu={setShowMenu} />
                    <Routes>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path="/invoices" element={<Invoices />} />
                        <Route path="/sections" >
                            <Route index element={<Sections />} />
                            <Route path=":id" element={<EditSection />} />
                        </Route>
                    </Routes>

                </div>

            </div>
        </>
    )
}

export default Home
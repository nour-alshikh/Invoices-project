import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillMenuAppFill } from "react-icons/bs";
import InvoicesDropdown from '../components/dropdowns/InvoicesDropdown'
import ReportsDropdown from '../components/dropdowns/ReportsDropdown'
import UsersDropdown from '../components/dropdowns/UsersDropdown'
import SettingsDropdown from '../components/dropdowns/SettingsDropdown'
import { AiFillDatabase } from "react-icons/ai";
import { AiFillFileExcel } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiTwotoneSetting } from "react-icons/ai";


const Sidebar = ({ user }) => {

    return (
        <>
            <div className='flex flex-col items-center my-6 w-full'>
                <div className='flex justify-center items-center'>
                    <div className='w-10'>
                        <img src="../../assets/n-logo.png" className='w-full h-full' alt="logo" />
                    </div>
                    <h1 className=' font-bold text-2xl'>Invoices</h1>
                </div>
                <div className='my-3 py-3 flex flex-col items-center'>
                    <div className=' relative '>
                        <img src='../../assets/careers-in-corporate-finance.jpg' alt="user" className='w-14 h-14 rounded-full ring ring-slate-100 shadow-md ring-offset-2' />
                        <div className=' absolute bottom-0 ring-1 ring-green-500 ring-offset-2 bg-green-500 w-1 h-1 rounded-full animate-ping transition duration-75 ease-in-out'></div>
                    </div>

                    <h1 className=' mt-2 font-semibold text-2xl'>{user?.name}</h1>
                    <p className=' text-gray-400'>
                        {user?.email}
                    </p>
                </div>
                <div className='flex flex-col items-start px-8 w-full'>
                    <h3 className=' text-gray-600 font-bold'>Invoices Page</h3>
                    <div className='my-3 flex justify-start items-center'>
                        <BsFillMenuAppFill />
                        <Link to='/dashboard' className='mx-3 font-semibold text-xl text-gray-700'>Main Dashboard</Link>
                    </div>
                </div>

                <div className='flex flex-col items-start px-8 w-full mt-4'>
                    <h3 className=' text-gray-600 font-bold'>Invoices</h3>
                    <div className='mt-3 flex justify-start items-center'>
                        <AiFillDatabase />
                        <InvoicesDropdown />
                    </div>
                </div>

                <div className='flex flex-col items-start px-8 w-full mt-4'>
                    <h3 className=' text-gray-600 font-bold'>Reports</h3>
                    <div className='mt-3 flex justify-start items-center'>
                        <AiFillFileExcel />
                        <ReportsDropdown />
                    </div>
                </div>

                <div className='flex flex-col items-start px-8 w-full mt-4'>
                    <h3 className=' text-gray-600 font-bold'>Users</h3>
                    <div className='mt-3 flex justify-start items-center'>
                        <AiOutlineUser />
                        <UsersDropdown />
                    </div>
                </div>

                <div className='flex flex-col items-start px-8 w-full mt-4'>
                    <h3 className=' text-gray-600 font-bold'>Settings</h3>
                    <div className='mt-3 flex justify-start items-center'>
                        <AiTwotoneSetting />
                        <SettingsDropdown />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
import { useState } from "react"
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from "../rtk/slices/userSlice"

const Login = () => {
    const [form, setForm] = useState({})
    const [flag, setFlag] = useState(false)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form)).unwrap()
            .then(({ data }) => {
                if (!data.user) {
                    setFlag(true)
                }
                else {

                    navigate('/')
                    setFlag(false)
                }
            }).catch(() => {
                setFlag(true)
            })
    }

    return (
        <div className="w-screen h-screen bg-slate-50 flex flex-col md:flex-row overflow-x-hidden">
            <div className="w-full md:w-1/2 h-full flex justify-center items-start px-20 flex-col">

                <div className="flex flex-row mb-11 w-20">
                    <img className=" w-full" src="../../assets/n-logo.png" alt="" />
                    <h2 className=" mb-4 font-semibold text-5xl mt-24 md:mt-0">Invoices Project</h2>
                </div>

                <div>
                    <h3 className="text-4xl text-cyan-600 font-semibold">Hello</h3>
                    <p className="text-3xl">Log in</p>
                </div>

                <form onSubmit={handleSubmit} className="my-8 w-full">
                    <div className=" flex flex-col w-full my-5">
                        <label htmlFor="email" className=" text-gray-500 mb-5">Email</label>
                        <motion.input whileFocus={{ scale: 1.05 }} onChange={handleChange} type="text" name="email" id="email" autoFocus className=" w-full py-2 px-4 text-gray-800 outline rounded-md outline-1 outline-gray-500 focus:outline-2 focus:outline-gray-600 bg-white" placeholder="Enter Email" />
                    </div>
                    <div className=" flex flex-col w-full my-5">
                        <label htmlFor="password" className=" text-gray-500 mb-5">Password</label>
                        <motion.input whileFocus={{ scale: 1.05 }} onChange={handleChange} type="password" name="password" id="password" className=" w-full py-2 px-4 text-gray-800 outline rounded-md outline-1 outline-gray-500 focus:outline-2 focus:outline-gray-600 bg-white" placeholder="Enter Password" />
                    </div>
                    {
                        flag && (
                            <div className=" text-red-600 font-semibold text-xl text-center">
                                Please , enter valid credintials
                            </div>
                        )
                    }

                    <div className=" flex flex-col w-full my-5">
                        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} className=" bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors">
                            Log in
                        </motion.button>
                    </div>
                </form>
            </div>

            <div className="w-full md:w-1/2 h-full bg-slate-100 py-8 px-10">
                <img
                    src='../../assets/careers-in-corporate-finance.jpg' className=" w-full h-full object-cover"
                    alt="login" />
            </div>
        </div>
    )
}

export default Login
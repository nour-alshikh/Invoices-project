
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import Navbar from '../components/Navbar'
import { useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import Dashboard from './Dashboard'
import Sidebar from '../components/Sidebar'
import Invoices from './invoices/Invoices'
import PayStatusInvoices from './invoices/PayStatusInvoices'
import Sections from './Sections'
import EditSection from '../components/EditSection'
import Products from './Products'
import EditProduct from '../components/EditProduct'
import InvoicesReports from './reports/InvoicesReports'
import CustomerReports from './reports/CustomerReports'
import ArchivedInvoices from './invoices/ArchivedInvoices'
import InvoiceDetails from './invoices/InvoiceDetails'
import Users from './Users'
import AddInvoice from './invoices/AddInvoice'
import EditInvoice from './invoices/EditInvoice'
import ChangeStatus from './invoices/ChangeStatus'

const Home = () => {
    const [showMenu, setShowMenu] = useState(false)
    const { user } = useSelector((state) => state.user)




    return (
        <>
            <div className='flex flex-row w-screen'>

                <div className='hidden md:flex w-1/5 h-screen flex-initial'>
                    <Sidebar user={user} />
                </div>

                {showMenu &&
                    <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-30'>
                        <div onClick={() => setShowMenu(false)} className='cursor-pointer'>
                            <IoCloseCircleOutline fontSize={30} />
                        </div>
                        <Sidebar user={user} />
                    </div>
                }

                <div className=' h-screen flex-1 overflow-y-scroll'>
                    <Navbar showMenu={showMenu} setShowMenu={setShowMenu} />
                    <Routes>
                        {/* <Route index element={<Dashboard />} /> */}
                        <Route index element={<Invoices />} />
                        <Route path="/invoices"  >
                            <Route index element={<Invoices />} />
                            <Route path='add-invoice' element={<AddInvoice />} />
                            <Route path='status/:status' element={<PayStatusInvoices />} />
                            <Route path='change-status/:id' element={<ChangeStatus />} />
                            <Route path='update/:id' element={<EditInvoice />} />
                            <Route path='archived' element={<ArchivedInvoices />} />
                            <Route path=':id' element={<InvoiceDetails />} />
                        </Route>
                        <Route path="/sections" >
                            <Route index element={<Sections />} />
                            <Route path=":id" element={<EditSection />} />
                        </Route>
                        <Route path="/products" >
                            <Route index element={<Products />} />
                            <Route path=":id" element={<EditProduct />} />
                        </Route>
                        <Route path="/reports" >
                            <Route index path='invoices-reports' element={<InvoicesReports />} />
                            <Route path="customer-reports" element={<CustomerReports />} />
                        </Route>
                        <Route path="/users" element={<Users />} />
                    </Routes>

                </div>

            </div>
        </>
    )
}

export default Home
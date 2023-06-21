import InvoicesTable from "../../components/tables/InvoicesTable"
import BasicBreadcrumbs from "../../components/mui/BasicBreadcrumbs"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Invoices = () => {

    const [rows, setRows] = useState([])
    useEffect(() => {
        fetchInvoices()
    }, [])

    const fetchInvoices = async () => {
        await axios.get(`http://127.0.0.1:8000/api/invoices`).then(({ data }) => {
            setRows(data.invoices)
        })
    }
    return (
        <div className=" min-h-screen bg-slate-100 py-8 px-5">
            <BasicBreadcrumbs main="Invoices" page="Invoices List" />
            <div className="py-2">
                <Link to='/invoices/add-invoice' className=" py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-md block w-fit my-10">Add Invoice</Link>
                <InvoicesTable invoices={rows} showMenu={true} fetchInvoices={fetchInvoices} />
            </div>
        </div>
    )
}

export default Invoices
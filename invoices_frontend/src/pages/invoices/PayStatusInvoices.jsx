import InvoicesTable from "../../components/tables/InvoicesTable"
import BasicBreadcrumbs from "../../components/mui/BasicBreadcrumbs"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import WithGuard from "../../utils/WithGuard";


const PayStatusInvoices = () => {

    const { status } = useParams()

    const [rows, setRows] = useState([])
    useEffect(() => {
        fetchInvoices()
    }, [status])

    const fetchInvoices = async () => {
        await axios.get(`http://127.0.0.1:8000/api/invoices/status/${status}`).then(({ data }) => {
            setRows(data.invoices)
        })
    }
    return (
        <div className=" min-h-screen bg-slate-100 py-8 px-5">
            <BasicBreadcrumbs main="Invoices" page="Paid Invoices List" />
            <div className="p-5">
                <InvoicesTable invoices={rows} showMenu={true} />
            </div>
        </div>
    )
}

export default WithGuard(PayStatusInvoices)
import InvoicesTable from "../../components/tables/InvoicesTable"
import BasicBreadcrumbs from "../../components/mui/BasicBreadcrumbs"
import { useEffect, useState } from "react";
import axios from "axios";
import WithGuard from "../../utils/WithGuard";

const ArchivedInvoices = () => {

    const [rows, setRows] = useState([])
    useEffect(() => {
        fetchInvoices()
    }, [])

    const fetchInvoices = async () => {
        await axios.get(`http://127.0.0.1:8000/api/invoices-archived`).then(({ data }) => {
            setRows(data.invoices)
        })
    }
    return (
        <div className=" min-h-screen bg-slate-100 py-8 px-5">
            <BasicBreadcrumbs main="Invoices" page="Archived Invoices" />
            <div className="p-5">
                <InvoicesTable invoices={rows} fetchArchived={fetchInvoices} />
            </div>
        </div>
    )
}

export default WithGuard(ArchivedInvoices)
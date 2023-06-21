import { useState } from "react";
import InvoicesTable from '../../components/tables/InvoicesTable'
import { useSelector } from "react-redux";
import axios from "axios";

const SearchByNumber = ({ radio }) => {
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [showTable, setShowTable] = useState(false)
    const [rows, setRows] = useState([])

    const { token } = useSelector((state) => state.user)

    const handleSearch = async () => {
        const form = {
            radio,
            invoice_number: invoiceNumber
        }

        await axios.post(`http://127.0.0.1:8000/api/invoices-report`, form, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(({ data }) => {
            setShowTable(true)
            setRows(data?.invoice)
        })
    }
    return (
        <div>
            <div className=" w-1/2 flex justify-between items-center m-auto my-5">
                <label htmlFor="invoice_number">Invoice Number</label>
                <input value={invoiceNumber} className=" p-5 rounded-md" type="text" name="invoice_number" id="invoice_number" onChange={(e) => setInvoiceNumber(e.target.value)} />
            </div>
            <div className=" w-1/2 text-center m-auto my-2">
                <input className=" p-3 rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer text-white transition-all" type="button" value='Search' onClick={handleSearch} />
            </div>
            {
                showTable && <InvoicesTable invoices={rows} />
            }
        </div>
    )
}

export default SearchByNumber
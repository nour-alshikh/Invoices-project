import axios from "axios"
import { useEffect, useState } from "react"

const InvoiceChanges = ({ id }) => {
    const [invoice, setInvoice] = useState({})
    const fetchInvoice = async () => {
        await axios.get(`http://127.0.0.1:8000/api/invoice-details/${id}`).then(({ data }) => {
            console.log(data.invoice_details[0])
        })
    }

    useEffect(() => {
        fetchInvoice()
    }, [id])
    return (
        <div>

        </div>
    )
}

export default InvoiceChanges
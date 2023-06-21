import { useState } from "react";
import InvoicesTable from '../../components/tables/InvoicesTable'
import { useSelector } from "react-redux";
import axios from "axios";

const SearchByStatus = ({ radio }) => {

    const [status, setStatus] = useState("")
    const [starts_at, setStarts_at] = useState(new Date());
    const [ends_at, setEnds_at] = useState(new Date());
    const [showTable, setShowTable] = useState(false)

    const [rows, setRows] = useState([])

    const { token } = useSelector((state) => state.user)


    const handleSearch = async () => {
        const form = {
            radio,
            status,
            starts_at,
            ends_at
        }

        await axios.post(`http://127.0.0.1:8000/api/invoices-report`, form, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(({ data }) => {
            setShowTable(true)
            setRows(data?.unpaid)
        })
    }
    return (
        <>
            <div>
                <div>
                    <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} className=" d-block w-full px-2 py-5 bg-white border rounded-md cursor-pointer" aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value='paid'>Paid Invoices</option>
                        <option value='unpaid'>Unpaid Invoices</option>
                        <option value='partially'>Partially Paid Invoices</option>
                    </select>
                </div>
                <div className=" w-1/2 flex justify-between items-center m-auto my-5">
                    <label htmlFor="starts_at">From</label>
                    <input className=" p-5 rounded-md" type="date" name="starts_at" id="starts_at" onChange={(e) => setStarts_at(e.target.value)} />
                </div>
                <div className=" w-1/2 flex justify-between items-center m-auto my-5">
                    <label htmlFor="ends_at">To</label>
                    <input className=" p-5 rounded-md" type="date" name="ends_at" id="ends_at" onChange={(e) => setEnds_at(e.target.value)} />
                </div>
                <div className=" w-1/2 text-center m-auto my-2">
                    <input className=" p-3 rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer text-white transition-all" type="button" value='Search' onClick={handleSearch} />
                </div>
                {
                    showTable && <InvoicesTable invoices={rows} />
                }



            </div>
        </>
    )
}

export default SearchByStatus
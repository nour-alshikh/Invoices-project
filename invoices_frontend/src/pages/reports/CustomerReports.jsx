import { useState } from "react";
import BasicBreadcrumbs from "../../components/mui/BasicBreadcrumbs"
import { useSelector } from "react-redux";
import axios from "axios";
import InvoicesTable from '../../components/tables/InvoicesTable'
import WithGuard from "../../utils/WithGuard";

const CustomerReports = () => {

    const [section, setSection] = useState("")
    const [product, setProduct] = useState("")
    const [starts_at, setStarts_at] = useState("");
    const [ends_at, setEnds_at] = useState("");
    const [showTable, setShowTable] = useState(false)

    const { token } = useSelector((state) => state.user)
    const { sections } = useSelector((state) => state.section)
    const { products } = useSelector((state) => state.product)

    const handleSearch = async () => {

        const form = {
            section_id: section,
            product: product,
            starts_at,
            ends_at
        }
        await axios.post(`http://127.0.0.1:8000/api/customer-report`, form, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(({ data }) => {
            setShowTable(true)
            setRows(data?.invoices)
        })
    }

    return (
        <div className=" min-h-screen bg-slate-100 py-8 px-5">
            <BasicBreadcrumbs main="Reports" page="Customer Reports" />
            <div className="p-5">
                <div>
                    <div className=" mb-6">
                        <select name="section" value={section} onChange={(e) => setSection(e.target.value)} className=" d-block w-full px-2 py-5 bg-white border rounded-md cursor-pointer" aria-label="Default select example">
                            <option>Open this select menu</option>
                            {sections.map((section) => (
                                <option value={section.id}>{section.section_name}</option>
                            ))}

                        </select>
                    </div>
                    <div>
                        <select name="product" value={product} onChange={(e) => setProduct(e.target.value)} className=" d-block w-full px-2 py-5 bg-white border rounded-md cursor-pointer" aria-label="Default select example">
                            <option>Open this select menu</option>

                            {products.filter(product => product.section_id == section).map(pro => (
                                <option value={pro.pro_id}>{pro.product_name}</option>
                            )
                            )}

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
            </div>
        </div>
    )
}

export default WithGuard(CustomerReports)

import { useState } from "react"
import BasicBreadcrumbs from "../../components/mui/BasicBreadcrumbs"
import SearchByStatus from "../../components/search/SearchByStatus"
import SearchByNumber from "../../components/search/SearchByNumber"
import WithGuard from "../../utils/WithGuard"


const InvoicesReports = () => {

    const [search, setSearch] = useState(true)
    const [radio, setRadio] = useState(1)

    return (
        <div className=" min-h-screen bg-slate-100 py-8 px-5">
            <BasicBreadcrumbs main="Reports" page="Invoices Reports" />
            <div className="p-5">
                <div className="flex items-center my-6">
                    <input
                        type="radio"
                        id="ByInvoiceStatus"
                        name="radio-button"
                        className=" w-4 h-4 rounded-full checked:bg-blue-500 border-blue-500 m-0 me-5"
                        onClick={() => { setSearch(true); setRadio(1) }}
                        checked={search}
                    />
                    <label htmlFor="ByInvoiceStatus">By Invoice Status</label>
                </div>
                <div className="flex items-center my-6">
                    <input
                        type="radio"
                        id="ByInvoiceNumber"
                        name="radio-button"
                        className=" w-4 h-4 rounded-full checked:bg-blue-500 me-5 border-blue-500"
                        onClick={() => { setSearch(false); setRadio(2) }}
                        checked={!search}
                    />
                    <label htmlFor="ByInvoiceNumber">By Invoice Number</label>
                </div>
            </div>
            {
                search ? <SearchByStatus radio={radio} /> : <SearchByNumber radio={radio} />
            }
        </div>
    )
}

export default WithGuard(InvoicesReports)
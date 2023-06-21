import { TextField } from "@mui/material"
import BasicBreadcrumbs from "../../components/mui/BasicBreadcrumbs"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'

import { useNavigate } from "react-router-dom";
import axios from "axios";
import WithGuard from '../../utils/WithGuard'


const AddInvoice = () => {
    const { user, token } = useSelector((state) => state.user)
    const { sections } = useSelector((state) => state.section)
    const { products } = useSelector((state) => state.product)


    const [form, setForm] = useState({
        invoice_number: "",
        invoice_date: "",
        due_date: "",
        section_id: "",
        product: "",
        amount_collection: "",
        amount_commission: "",
        discount: "",
        rate_vat: "",
        value_vat: "",
        value_status: "",
        note: "",
        user: user.name,
    })

    const [valueVat, setValueVat] = useState("")
    const [totalC, setTotalC] = useState("")

    const navigate = useNavigate()
    useEffect(() => {
        setValueVat((form.amount_commission - form.discount) * form.rate_vat / 100)

    }, [form.amount_commission, form.discount, form.rate_vat])
    useEffect(() => {
        setTotalC((form.amount_commission - form.discount) + valueVat)
    }, [form.amount_commission, form.discount, form.rate_vat, valueVat])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let sectionName = sections.filter((sec) => sec.id == form.section_id)
        const sentForm = { ...form, section: sectionName[0]?.section_name, value_vat: valueVat, total: totalC }
        axios.post(`http://127.0.0.1:8000/api/invoices`, sentForm, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            navigate('/invoices')
        })
    }

    return (
        <div className=" min-h-screen bg-slate-100 py-8 px-5">
            <BasicBreadcrumbs main="Invoices" page="Add Invoice" />
            <div className="p-2 my-5 bg-white rounded-md">
                <div className=" flex justify-between gap-5 my-8">

                    <div className=" w-1/2">
                        <TextField className="w-full" id="outlined-basic" label="Invoice Number" value={form.invoice_number} variant="outlined" name="invoice_number" onChange={handleChange} />
                    </div>


                    <div className=" w-1/2">
                        <TextField className="w-full" id="outlined-basic" label="Amount Collection"
                            name="amount_collection"
                            value={form.amount_collection}
                            onChange={handleChange} variant="outlined" />
                    </div>


                </div>
                <div className=" flex justify-between gap-5 my-8">
                    <div className=" w-1/2">
                        <label className=" text-gray-500 " htmlFor="starts_at">Invoice Date</label>
                        <input className=" p-3 rounded-md border bg-gray-100 w-full" type="date" name="invoice_date" id="invoice_date" value={form.invoice_date} onChange={handleChange} />
                    </div>
                    <div className=" w-1/2">
                        <label className=" text-gray-500 " htmlFor="starts_at">Due Date</label>
                        <input className=" p-3 rounded-md border bg-gray-100 w-full" type="date" name="due_date" id="due_date" value={form.due_date} onChange={handleChange} />
                    </div>
                </div>
                <div className=" flex justify-between gap-5 my-8">

                    <div className=" w-1/2">
                        <select name="section_id" value={form.section_id} onChange={handleChange} className=" d-block w-full px-2 py-5 bg-white border rounded-md" aria-label="Default select example">
                            <option>Select Section</option>
                            {
                                sections.map((section) => {

                                    return <option key={section.id} value={section.id}>{section.section_name}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className=" w-1/2">
                        <select name="product" value={form.product} onChange={handleChange} className=" d-block w-full px-2 py-5 bg-white border rounded-md cursor-pointer" aria-label="Default select example">
                            <option>Select Product</option>

                            {products.filter(product => product.section_id == form.section_id).map(pro => (
                                <option key={pro.pro_id} value={pro.pro_id}>{pro.product_name}</option>
                            )
                            )}

                        </select>
                    </div>

                </div>
                <div className=" flex justify-between gap-5 my-8">
                    <div className=" w-1/2">
                        <TextField className="w-full" id="outlined-basic"
                            name="discount"
                            value={form.discount}
                            onChange={handleChange}
                            label="Discount" variant="outlined" />
                    </div>
                    <div className=" w-1/2">
                        <TextField className="w-full" id="outlined-basic" label="Rate Vat"
                            value={form.rate_vat}
                            name="rate_vat"
                            onChange={handleChange} variant="outlined" />
                    </div>
                </div>
                <div className=" flex justify-between gap-5 my-8">
                    <div className=" w-1/2">
                        <TextField className="w-full"
                            name="valueVat"
                            value={valueVat}
                            focused disabled
                            onChange={handleChange}
                            id="outlined-basic" label="Value Vat" variant="outlined" />
                    </div>

                    <div className=" w-1/2">
                        <TextField className="w-full"
                            name="amount_commission"
                            value={form.amount_commission}
                            onChange={handleChange}
                            id="outlined-basic" label="Amount Commission" variant="outlined" />
                    </div>
                </div>
                <div className=" flex justify-between gap-5 my-8">
                    <div className=" w-1/2">
                        <TextField className="w-full"
                            name="note"
                            value={form.note}
                            onChange={handleChange}
                            id="outlined-basic" label="Note" variant="outlined" />
                    </div>
                    <div className=" w-1/2">
                        <TextField className="w-full"
                            name="user"
                            value={form.user}
                            id="outlined-basic" label="User" variant="outlined" />
                    </div>
                </div>
                <div className=" flex justify-between gap-5 my-8">
                    <div className=" w-1/2">
                        <TextField className="w-full"
                            name="total"
                            value={totalC}
                            disabled focused
                            onChange={handleChange}
                            id="outlined-basic" label="Total" variant="outlined" />
                    </div>
                </div>
                <div className=" flex justify-center gap-5 my-8">

                    <button onClick={handleSubmit} className="py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-md block w-fit my-10">Add Invoice</button>

                </div>
            </div>
        </div>
    )
}

export default WithGuard(AddInvoice)
import { TextField } from "@mui/material"
import BasicBreadcrumbs from "../../components/mui/BasicBreadcrumbs"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import WithGuard from "../../utils/WithGuard";


const ChangeStatus = () => {
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
        total: "",
        value_status: "",
        note: "",
        user: user.name,
        payment_date: ""
    })

    const { id } = useParams()
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/invoices/${id}`).then(({ data }) => {
            setForm(data.invoice)
        })
    }, [id])

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let sectionName = sections.filter((sec) => sec.id == form.section_id)
        let sentForm = { ...form, section: sectionName[0].section_name }
        sentForm.status == 'paid' ? sentForm = { ...form, value_status: "1" } :
            sentForm.status == 'unpaid' ? sentForm = { ...form, value_status: "2" } :
                sentForm.status == 'partially' ? sentForm = { ...form, value_status: "3" } : ""

        axios.post(`http://127.0.0.1:8000/api/update-status/${id}`, sentForm, {
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
                        <TextField disabled className="w-full" id="outlined-basic" label="Invoice Number" value={form.invoice_number} variant="outlined" name="invoice_number" onChange={handleChange} />
                    </div>


                    <div className=" w-1/2">
                        <TextField disabled className="w-full" id="outlined-basic" label="Amount Collection"
                            name="amount_collection"
                            value={form.amount_collection}
                            onChange={handleChange} variant="outlined" />
                    </div>


                </div>
                <div className=" flex justify-between gap-5 my-8">
                    <div className=" w-1/2">
                        <label className=" text-gray-500 " htmlFor="starts_at">Invoice Date</label>
                        <input disabled className=" p-3 rounded-md border bg-gray-100 w-full" type="date" name="invoice_date" id="invoice_date" value={form.invoice_date} onChange={handleChange} />
                    </div>
                    <div className=" w-1/2">
                        <label className=" text-gray-500 " htmlFor="starts_at">Due Date</label>
                        <input disabled className=" p-3 rounded-md border bg-gray-100 w-full" type="date" name="due_date" id="due_date" value={form.due_date} onChange={handleChange} />
                    </div>
                </div>
                <div className=" flex justify-between gap-5 my-8">

                    <div className=" w-1/2">
                        <select disabled name="section_id" value={form.section_id} onChange={handleChange} className=" d-block w-full px-2 py-5 bg-white border rounded-md" aria-label="Default select example">
                            <option>Select Section</option>
                            {
                                sections.map((section) => {

                                    return <option key={section.id} value={section.id}>{section.section_name}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className=" w-1/2">
                        <select disabled name="product" value={form.product} onChange={handleChange} className=" d-block w-full px-2 py-5 bg-white border rounded-md cursor-pointer" aria-label="Default select example">
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
                        <TextField disabled className="w-full" id="outlined-basic"
                            name="discount"
                            value={form.discount}
                            onChange={handleChange}
                            label="Discount" variant="outlined" />
                    </div>
                    <div className=" w-1/2">
                        <TextField disabled className="w-full" id="outlined-basic" label="Rate Vat"
                            value={form.rate_vat}
                            name="rate_vat"
                            onChange={handleChange} variant="outlined" />
                    </div>
                </div>
                <div className=" flex justify-between gap-5 my-8">
                    <div className=" w-1/2">
                        <TextField disabled className="w-full"
                            name="value_vat"
                            value={form.value_vat}
                            onChange={handleChange}
                            id="outlined-basic" label="Value Vat" variant="outlined" />
                    </div>

                    <div className=" w-1/2">
                        <TextField disabled className="w-full"
                            name="amount_commission"
                            value={form.amount_commission}
                            onChange={handleChange}
                            id="outlined-basic" label="Amount Commission" variant="outlined" />
                    </div>
                </div>
                <div className=" flex justify-between gap-5 my-8">
                    <div className=" w-1/2">
                        <TextField disabled className="w-full"
                            name="note"
                            value={form.note}
                            onChange={handleChange}
                            id="outlined-basic" label="Note" variant="outlined" />
                    </div>
                    <div className=" w-1/2">
                        <TextField disabled className="w-full"
                            name="user"
                            value={form.user}
                            id="outlined-basic" label="User" variant="outlined" />
                    </div>
                </div>
                <div className=" flex justify-between gap-5 my-8">
                    <div className=" w-full">
                        <TextField disabled className="w-full"
                            name="total"
                            value={form.total}
                            onChange={handleChange}
                            id="outlined-basic" label="Total" variant="outlined" />
                    </div>
                </div>
                <div className=" flex justify-between gap-5 my-8">

                    <div className=" w-1/2">
                        <label className=" text-gray-500 " htmlFor="starts_at">Payment Status</label>
                        <select name="status" value={form.status} onChange={handleChange} className=" d-block w-full px-2 py-5 bg-white border rounded-md" aria-label="Default select example">
                            <option>Select Status</option>
                            <option value='paid'>Paid</option>
                            <option value='unpaid'>Unpaid</option>
                            <option value='partially'>Partially-Paid</option>

                        </select>
                    </div>

                    <div className=" w-1/2">
                        <label className=" text-gray-500 " htmlFor="starts_at">Payment Date</label>
                        <input className=" p-3 rounded-md border bg-gray-100 w-full" type="date" name="payment_date" id="payment_date" value={form.payment_date} onChange={handleChange} />
                    </div>

                </div>
                <div className=" flex justify-center gap-5 my-8">

                    <button onClick={handleSubmit} className="py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-md block w-fit my-10">Update Invoice</button>

                </div>
            </div>
        </div>
    )
}

export default WithGuard(ChangeStatus)
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchProduct, updateProduct } from "../rtk/slices/ProductSlice"
import { TextField } from "@mui/material"

const EditProduct = () => {
    const [form, setForm] = useState({
        id: "",
        name: "",
        description: "",
        section_id: '',
        section_name: ""
    })

    const { sections } = useSelector((state) => state.section)

    const { id } = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchProduct(id)).unwrap().then(({ data }) => {
            setForm({
                id: data.product.id,
                name: data.product.product_name,
                description: data.product.description,
                section_id: data.product.section_id,
                section_name: data.product.section_name,
            })
        })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let section_name = sections.filter((section) => {
            return section.id == form.section_id
        })

        const sentForm = { ...form, section_name: section_name[0].section_name }
        dispatch(updateProduct(sentForm)).unwrap().then(() => {
            navigate('/products')
        })
    }

    return (
        <>
            <div className=" h-screen flex justify-center items-center flex-col">
                <div className="px-5 mb-6 w-full">
                    <TextField id="outlined-basic" label="Product Name" variant="outlined" name="name" onChange={handleChange} value={form.name} className=" w-full" />
                </div>
                <div className="px-5 mb-6 w-full">
                    <TextField id="outlined-basic" label="Description" variant="outlined" name="description" onChange={handleChange} value={form.description} className=" w-full" />
                </div>

                <div className="px-5 mb-6 w-full">

                    <select name="section_id" value={form.section_id} onChange={handleChange} className=" d-block w-full px-2 py-5 bg-white border rounded-md" aria-label="Default select example">
                        <option>Open this select menu</option>
                        {
                            sections.map((section) => {
                                let selected = (form.section_id == section.id) ? true : false;
                                return <option selected={selected} value={section.id}>{section.section_name}</option>
                            })
                        }
                    </select>

                </div>
                <div className="flex justify-end">
                    <button onClick={handleSubmit} className='bg bg-blue-600 text-white rounded-md hover:bg-blue-700 transition px-3 py-2'>
                        Update
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditProduct
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchSection, updateSection } from "../rtk/slices/SectionSlice"
import { TextField } from "@mui/material"

const EditSection = () => {
    const [form, setForm] = useState({
        id: "",
        name: "",
        description: ""
    })

    const { id } = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchSection(id)).unwrap().then(({ data }) => {
            setForm({
                id: data.section.id,
                name: data.section.section_name,
                description: data.section.description,
            })
        })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateSection(form)).unwrap().then(() => {
            navigate('/sections')
        })
    }

    return (
        <>
            <div className=" h-screen flex justify-center items-center flex-col">
                <div className="px-5 mb-6 w-full">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" name="name" onChange={handleChange} value={form.name} className=" w-full" />
                </div>
                <div className="px-5 mb-6 w-full">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" name="description" onChange={handleChange} value={form.description} className=" w-full" />
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

export default EditSection
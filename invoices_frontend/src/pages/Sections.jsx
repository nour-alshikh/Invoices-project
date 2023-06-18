import SectionsTable from "../components/tables/SectionsTable"

import BasicBreadcrumbs from "../components/mui/BasicBreadcrumbs"
import SectionFormDialog from "../components/forms/SectionFormDialog"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSection, fetchSections } from "../rtk/slices/SectionSlice"

const Sections = () => {

    const { sections, } = useSelector((state) => state.section)
    const { user } = useSelector((state) => state.user)
    const name = user.name;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSections())
    }, [dispatch])


    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const sentForm = { ...form, created_by: name }

        dispatch(addSection(sentForm)).unwrap().then(() => {
            setOpen(false);
            setForm({ name: '', description: "", created_by: "" });
            dispatch(fetchSections())
        })
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    };

    return (
        <div className=" min-h-screen bg-slate-100 py-8 px-5">
            <BasicBreadcrumbs main="Settings" page="Sections" />
            <div className="p-5">

                <div className=" flex justify-end">

                    <SectionFormDialog
                        title="Add New Section"
                        button="Add section"
                        btnColor="blue"
                        handleClickOpen={handleClickOpen}
                        open={open}
                        setOpen={setOpen}
                        form={form}
                        setForm={setForm}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit} />

                </div>

                <SectionsTable sections={sections} handleChange={handleChange}
                    form={form}
                    setForm={setForm} />
            </div>
        </div>
    )
}

export default Sections
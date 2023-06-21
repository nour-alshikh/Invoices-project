import ProductsTable from "../components/tables/ProductsTable"
import BasicBreadcrumbs from "../components/mui/BasicBreadcrumbs"
import ProductFormDialog from "../components/forms/ProductFormDialog"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, fetchProducts } from "../rtk/slices/ProductSlice"
import WithGuard from "../utils/WithGuard"

const Products = () => {

    const { products } = useSelector((state) => state.product)
    const { sections } = useSelector((state) => state.section)
    const { user } = useSelector((state) => state.user)
    const name = user.name;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])


    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
        section_id: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        let section_name = sections.filter((section) => {
            return section.id == form.section_id
        })

        const sentForm = { ...form, section_name: section_name[0].section_name }
        dispatch(addProduct(sentForm)).unwrap().then(() => {
            setOpen(false);
            setForm({ name: '', description: "", section_id: "" });
            dispatch(fetchProducts())
        })
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    };

    return (
        <div className=" min-h-screen bg-slate-100 py-8 px-5">
            <BasicBreadcrumbs main="Products" page="Products" />
            <div className="p-5">

                <div className=" flex justify-end">

                    <ProductFormDialog
                        title="Add New Product"
                        button="Add product"
                        btnColor="blue"
                        handleClickOpen={handleClickOpen}
                        open={open}
                        setOpen={setOpen}
                        form={form}
                        setForm={setForm}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit} />

                </div>
                <ProductsTable
                    products={products}
                    handleChange={handleChange}
                    form={form}
                    setForm={setForm} />
            </div>
        </div>
    )
}

export default WithGuard(Products)
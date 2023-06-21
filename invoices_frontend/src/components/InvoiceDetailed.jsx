import { useSelector } from 'react-redux'
const InvoiceDetailed = ({ invoice }) => {

    const { sections } = useSelector((state) => state.section)
    let section = sections.filter((sec) => sec.id == invoice?.section_id)
    return (
        <>
            <div className=" flex justify-between gap-2 my-5">
                <div className=" w-1/2">
                    <p className=" text-blue-500">Invoice Number</p>
                    <p className=" bg-gray-200 py-3 px-5 rounded-md">{invoice?.invoice_number}</p>
                </div>
                <div className=" w-1/2">
                    <p className=" text-blue-500">Invoice Date</p>
                    <p className=" bg-gray-200 py-3 px-5 rounded-md">{invoice?.invoice_date}</p>
                </div>
            </div>
            <div className=" flex justify-between gap-2 my-5">
                <div className=" w-1/2">
                    <p className=" text-blue-500">Due Date</p>
                    <p className=" bg-gray-200 py-3 px-5 rounded-md">{invoice?.due_date}</p>
                </div>
                <div className=" w-1/2">
                    <p className=" text-blue-500">Section</p>
                    <p className=" bg-gray-200 py-3 px-5 rounded-md">{section[0]?.section_name}</p>
                </div>
            </div>
            <div className=" flex justify-between gap-2 my-5">
                <div className=" w-1/2">
                    <p className=" text-blue-500">Amount Collection</p>
                    <p className=" bg-gray-200 py-3 px-5 rounded-md">{invoice?.amount_collection}</p>
                </div>
                <div className=" w-1/2">
                    <p className=" text-blue-500">Amount Commission</p>
                    <p className=" bg-gray-200 py-3 px-5 rounded-md">{invoice?.amount_commission}</p>
                </div>
            </div>
            <div className=" flex justify-between gap-2 my-5">
                <div className=" w-1/2">
                    <p className=" text-blue-500">Rate Value</p>
                    <p className=" bg-gray-200 py-3 px-5 rounded-md">{invoice?.rate_vat}</p>
                </div>
                <div className=" w-1/2">
                    <p className=" text-blue-500">value vat</p>
                    <p className=" bg-gray-200 py-3 px-5 rounded-md">{invoice?.value_vat}</p>
                </div>
            </div>
            <div className=" flex justify-between gap-2 my-5">
                <div className=" w-1/2">
                    <p className=" text-blue-500">Discount</p>
                    <p className=" bg-gray-200 py-3 px-5 rounded-md">{invoice?.discount}</p>
                </div>
                <div className=" w-1/2">
                    <p className=" text-blue-500">Note</p>
                    <p className=" bg-gray-200 py-3 px-5 rounded-md">{invoice?.note}</p>
                </div>
            </div>
        </>
    )
}

export default InvoiceDetailed
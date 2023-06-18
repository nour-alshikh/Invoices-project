import InvoicesTable from "../../components/tables/InvoicesTable"
import BasicBreadcrumbs from "../../components/mui/BasicBreadcrumbs"

const columns = [
    { id: 'invoice_number', label: 'Invoice Number', minWidth: 170 },
    { id: 'invoice_date', label: 'Invoice Date', minWidth: 100 },
    { id: 'due_date', label: 'Due Date', minWidth: 100 },
    { id: 'product', label: 'Product', minWidth: 100 },
    { id: 'section', label: 'Section', minWidth: 100 },
    { id: 'discount', label: 'Discount', minWidth: 100 },
    { id: 'rate_vat', label: 'Vate_vat', minWidth: 100 },
    { id: 'value_vat', label: 'Value_vat', minWidth: 100 },
    { id: 'total', label: 'Total', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'note', label: 'Note', minWidth: 100 },
    { id: 'user', label: 'User', minWidth: 100 },
];

function createData(invoice_number, invoice_date, due_date, product, section, discount, rate_vat, value_vat, total, status, note, user) {

    return { invoice_number, invoice_date, due_date, product, section, discount, rate_vat, value_vat, total, status, note, user };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263, 'India', 'IN', 1324171354, 3287263, 'India', 'IN', 1324171354, 3287263,),
];

const Invoices = () => {
    return (
        <div className=" min-h-screen bg-slate-100 py-8 px-5">
            <BasicBreadcrumbs main="Invoices" page="Invoices List" />
            <div className="p-5">
                <InvoicesTable columns={columns} createData={createData} rows={rows} />
            </div>
        </div>
    )
}

export default Invoices
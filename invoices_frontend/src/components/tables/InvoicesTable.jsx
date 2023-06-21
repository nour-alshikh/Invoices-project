import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InvoicesActionsDropdown from '../../components/dropdowns/InvoicesActionsDropdown'
import InvoicesArchivedActionsDropdown from '../../components/dropdowns/InvoicesArchivedActionsDropdown'

export default function StickyHeadTable({ invoices, showMenu, fetchInvoices, fetchArchived }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const { sections } = useSelector((state) => state.section)

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Invoice Number
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Invoice Date
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Due Date
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Product
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Section
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Amount Collection
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Discount
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Vate vat
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Value_vat
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Total
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Status
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Note
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                User
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            invoices?.map((invoice) => (
                                <TableRow hover role="checkbox" key={invoice.id} tabIndex={-1} >
                                    <TableCell >
                                        <Link to={`/invoices/${invoice.id}`}>
                                            {invoice?.invoice_number}
                                        </Link>
                                    </TableCell>
                                    <TableCell >

                                        {invoice.invoice_date}
                                    </TableCell>
                                    <TableCell >
                                        {invoice.due_date}
                                    </TableCell>
                                    <TableCell >
                                        {invoice.product}
                                    </TableCell>
                                    <TableCell >
                                        {
                                            invoice.section
                                        }
                                    </TableCell>
                                    <TableCell >
                                        {invoice.amount_collection}
                                    </TableCell>
                                    <TableCell >
                                        {invoice.discount}
                                    </TableCell>
                                    <TableCell >
                                        {invoice.rate_vat}
                                    </TableCell>
                                    <TableCell >
                                        {invoice.value_vat}
                                    </TableCell>
                                    <TableCell >
                                        {invoice.total}
                                    </TableCell>
                                    <TableCell >
                                        {
                                            invoice.status == 'unpaid' ? (
                                                <p className=' text-white text-center px-4 py-2 rounded-md bg-red-600'>{invoice.status}</p>
                                            ) : invoice.status == 'paid' ? (
                                                <p className=' text-white text-center px-4 py-2 rounded-md bg-green-600'>{invoice.status}</p>
                                            ) : (
                                                <p className=' text-white text-center px-4 py-2 rounded-md bg-yellow-500'>{invoice.status}</p>
                                            )
                                        }
                                    </TableCell>
                                    <TableCell >
                                        {invoice.note}
                                    </TableCell>
                                    <TableCell >
                                        {invoice.user}
                                    </TableCell>
                                    {showMenu ? <TableCell >
                                        <InvoicesActionsDropdown id={invoice.id} fetchInvoices={fetchInvoices} />
                                    </TableCell> : <TableCell ><InvoicesArchivedActionsDropdown id={invoice.id} fetchInvoices={fetchArchived} /></TableCell>}

                                </TableRow>

                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={invoices?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
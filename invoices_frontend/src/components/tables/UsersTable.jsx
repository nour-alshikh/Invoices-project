import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';


export default function StickyHeadTable({ users }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Name
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Email
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Role
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Actions
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow hover role="checkbox" tabIndex={-1} >
                                <TableCell >
                                    {user.name}
                                </TableCell>
                                <TableCell >

                                    {user.email}
                                </TableCell>
                                <TableCell >
                                    role
                                </TableCell>
                                <TableCell >
                                    <div className='flex justify-evenly'>

                                        <button onClick={() => navigate(`/users/${id}`)} className=' bg bg-green-600 text-white rounded-md hover:bg-green-700 transition px-3 py-2'>
                                            Update
                                        </button>
                                        <button className=' bg bg-red-600 text-white rounded-md hover:bg-red-700 transition px-3 py-2'>
                                            Delete
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                rowsPerPage={rowsPerPage}
                count={users.length}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
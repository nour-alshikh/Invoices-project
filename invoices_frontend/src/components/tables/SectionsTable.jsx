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
import { deleteSection, fetchSections } from '../../rtk/slices/SectionSlice';


export default function StickyHeadTable({ sections }) {
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

    const handleDelete = (id) => {
        dispatch(deleteSection(id)).unwrap().then(() => {
            dispatch(fetchSections())
        })
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Section Name
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Description
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Created By
                            </TableCell>
                            <TableCell
                                style={{ minWidth: '100' }}
                            >
                                Actions
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sections.map((section) => (
                            <TableRow hover role="checkbox" tabIndex={-1} >
                                <TableCell >
                                    {section.section_name}
                                </TableCell>
                                <TableCell >

                                    {section.description}
                                </TableCell>
                                <TableCell >
                                    {section.created_by}
                                </TableCell>
                                <TableCell >
                                    <div className='flex justify-evenly'>

                                        <button onClick={() => navigate(`/sections/${section.id}`)} className=' bg bg-green-600 text-white rounded-md hover:bg-green-700 transition px-3 py-2'>
                                            Update
                                        </button>
                                        <button onClick={() => handleDelete(section.id)} className=' bg bg-red-600 text-white rounded-md hover:bg-red-700 transition px-3 py-2'>
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
                count={sections.length}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
import * as React from 'react';
import Menu from '@mui/material/Menu';
import { Link, NavLink } from 'react-router-dom';
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function BasicMenu({ id, fetchInvoices }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { token } = useSelector((state) => state.user)

    const handleArchive = () => {
        axios.get(`http://127.0.0.1:8000/api/add-to-archive/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            handleClose()
            fetchInvoices()
        })
    }

    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/api/invoices/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            handleClose()
            fetchInvoices()
        })
    }

    return (
        <div>
            <div
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className='mx-3 font-semibold text-xl text-gray-700 cursor-pointer'
            >
                <BsFillArrowDownSquareFill color=' #2563eb' />
            </div>
            <Menu

                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <div className='flex flex-col'>
                    <Link className='px-5 py-2 hover:bg-slate-200 hover:text-green-600' to={`/invoices/update/${id}`} onClick={handleClose}>Update Invoice</Link>
                    <button className='px-5 py-2 hover:bg-slate-200 hover:text-red-600' onClick={handleDelete}>Delete Invoice</button>
                    <button className='px-5 py-2 hover:bg-slate-200 hover:text-blue-600' onClick={handleArchive}>Add to archive</button>
                    <Link className='px-5 py-2 hover:bg-slate-200 hover:text-blue-600' to={`/invoices/change-status/${id}`}
                    >Change Status</Link>

                </div>
            </Menu>
        </div>
    );
}
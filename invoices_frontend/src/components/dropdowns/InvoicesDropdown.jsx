import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink } from 'react-router-dom';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                Invoices
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
                    <Link className='px-5 py-2 hover:bg-slate-200 hover:text-blue-600' to='/invoices' onClick={handleClose}>Invoices List</Link>
                    <Link className='px-5 py-2 hover:bg-slate-200 hover:text-blue-600' to='/invoices/status/paid' onClick={handleClose}>Paid Invoices</Link>
                    <Link className='px-5 py-2 hover:bg-slate-200 hover:text-blue-600' to='/invoices/status/unpaid' onClick={handleClose}>Unpaid Invoices</Link>
                    <Link className='px-5 py-2 hover:bg-slate-200 hover:text-blue-600' to='/invoices/status/partially-paid' onClick={handleClose}>Partially Paid Invoices</Link>
                    <Link className='px-5 py-2 hover:bg-slate-200 hover:text-blue-600' to='/invoices/archived' onClick={handleClose}>Archived Invoices</Link>
                </div>
            </Menu>
        </div>
    );
}
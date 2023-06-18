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
            <NavLink
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className='mx-3 font-semibold text-xl text-gray-700'
            >
                Users
            </NavLink>
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
                    <Link className='px-5 py-2 hover:bg-slate-200 hover:text-blue-600' onClick={handleClose}>Users List</Link>
                    <Link className='px-5 py-2 hover:bg-slate-200 hover:text-blue-600' onClick={handleClose}>Users Permissions</Link>
                </div>
            </Menu>
        </div>
    );
}
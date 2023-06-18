import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { addSection, fetchSections } from '../../rtk/slices/SectionSlice'
import { useRef, useState } from 'react';

export default function FormDialog({ title, button, btnColor, id, handleClickOpen, open, setOpen, form, setForm, handleChange, handleSubmit, modalRef, test }) {

    const { user } = useSelector((state) => state.user)
    const name = user.name;

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div  >
            <button onClick={() => handleClickOpen(id)} className={`bg-${btnColor}-600 text-white rounded-md hover:bg-${btnColor}-700 transition px-3 py-2`}>
                {button}
            </button>

            <Dialog ref={modalRef} open={open} onClose={handleClose} aria-describedby={`${test}`}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <TextField
                        style={{ minWidth: '350px', marginBottom: '30px' }}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        name='name'
                        onChange={handleChange}
                        value={form?.name}
                        variant="standard"
                    />
                    <TextField
                        style={{ minWidth: '350px', }}
                        autoFocus
                        margin="dense"
                        id="desc"
                        onChange={handleChange}
                        value={form?.description}
                        name='description'
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <button className=' bg-red-600 text-white rounded-md hover:bg-red-700 transition px-3 py-2 my-5 ' onClick={handleClose}>Cancel</button>
                    <button className=' bg-blue-600 text-white rounded-md hover:bg-blue-700 transition px-3 py-2 my-5 ' onClick={handleSubmit}>{button}</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';

function handleClick(event) {
    event.preventDefault();
}

export default function BasicBreadcrumbs({ main, page }) {
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit">
                    {main}
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                >
                    {page}
                </Link>
            </Breadcrumbs>
        </div>
    );
}
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BasicBreadcrumbs from "../../components/mui/BasicBreadcrumbs"
import { Tab, Tabs } from "@mui/material"
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InvoiceDetailed from "../../components/InvoiceDetailed"
import InvoiceChanges from "../../components/InvoiceChanges"
import InvoiceAttach from "../../components/InvoiceAttach"
import WithGuard from "../../utils/WithGuard"


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const InvoiceDetails = () => {

    const [invoice, setInvoice] = useState({})

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { id } = useParams()

    useEffect(() => {
        fetchInvoice()
    }, [])

    const fetchInvoice = async () => {
        await axios.get(`http://127.0.0.1:8000/api/invoices/${id}`).then(({ data }) => {
            setInvoice(data.invoice)
        })
    }

    return (
        <div className=" min-h-screen bg-slate-100 py-8 px-5">
            <BasicBreadcrumbs main="Invoices" page="Invoice Details" />
            <div className="p-5">
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Invoice" {...a11yProps(0)} />
                    {/* <Tab label="Invoice Status" {...a11yProps(1)} />
                    <Tab label="Invoice Attachments" {...a11yProps(2)} /> */}
                </Tabs>
                <TabPanel value={value} index={0}>
                    <InvoiceDetailed invoice={invoice} />
                </TabPanel>
                {/* <TabPanel value={value} index={1}>
                    <InvoiceChanges id={id} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <InvoiceAttach />
                </TabPanel> */}
            </div>
        </div>
    )
}

export default WithGuard(InvoiceDetails)
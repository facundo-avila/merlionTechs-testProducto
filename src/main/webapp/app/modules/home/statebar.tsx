import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import SalesGrid from './sales-grid';

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
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));


const Statebar = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [loading, setLoading] = useState(true);
    
    const [salesInCharge, setInCharge] = useState([]);
    const [salesShipped, setShipped] = useState([]);
    const [salesDelivered, setDelivered] = useState([]);

    const getSales= async () =>{
        
        const tokenBody= {
            password: "admin",
            username: "admin"
        }

        const tokenRequest = {
            method: 'POST',
            body: JSON.stringify(tokenBody),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        try{
            const tokenResponse = await fetch("http://localhost:8080/api/authenticate", tokenRequest);
            const tokenJson = await tokenResponse.json();

            const salesData =  await fetch("http://localhost:9000/api/sales",{
                method: 'get', 
                headers: new Headers({
                'Authorization': 'Bearer '+tokenJson.id_token, 
                'Content-Type': 'application/x-www-form-urlencoded'
                })
            });
        
            const salesJson = await salesData.json();

            setInCharge(salesJson.filter((sale) => sale.state === "IN_CHARGE"));
            setShipped(salesJson.filter((sale) => sale.state === "SHIPPED"));
            setDelivered(salesJson.filter((sale) => sale.state === "DELIVERED"))

            setLoading(false)
        }catch(error){
            console.error(error)
        }
        
    }

    useEffect(() => {
        getSales()
    })

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="ENCARGADO" {...a11yProps(0)} />
                    <Tab label="ENVIADO" {...a11yProps(1)} />
                    <Tab label="ENTREGADO" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            
            <TabPanel value={value} index={0}>
                <SalesGrid saleList={salesInCharge}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SalesGrid saleList={salesShipped}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <SalesGrid saleList={salesDelivered} />
            </TabPanel>
            
        </div>
    );
}

export default Statebar;


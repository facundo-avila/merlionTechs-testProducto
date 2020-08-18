import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import saleState from "./sale-state.js";
import {Button} from "@material-ui/core";

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


const SaleTabs = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    //Listas de ventas según su estado
    const [salesInCharge, setInCharge] = useState([]);
    const [salesShipped, setShipped] = useState([]);
    const [salesDelivered, setDelivered] = useState([]);

    //Estado para indicar cuando se debe volver a ejecutar el useEffect
    const [updateDetected, setUpdateDetected] = useState(null);

    //Funcion para permitir que componentes hijos cambien el estado
    const handleClick = () =>{
        setUpdateDetected(true);
    };

    //Funcion asincrónica para obtener todas las ventas y distribuirlas entre distintas listas según su estado
    const getSales= async () =>{
         
        try{
            
            const authToken = JSON.parse(sessionStorage.getItem("jhi-authenticationToken"));

            const salesData =  await fetch("http://localhost:9000/api/sales",{
                method: 'get', 
                headers: new Headers({
                'Authorization': `Bearer ${authToken}`, 
                'Content-Type': 'application/json; charset=UTF-8'
                })
            });
        
            const salesJson = await salesData.json();

            setInCharge(salesJson.filter((sale) => sale.state === saleState.inCharge));
            setShipped(salesJson.filter((sale) => sale.state === saleState.shipped));
            setDelivered(salesJson.filter((sale) => sale.state === saleState.delivered));

            setUpdateDetected(false);
        }catch(error){
            console.error(error);
        }
        
    };

    useEffect(() => {
        getSales();
    },[updateDetected]);

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
                <SalesGrid saleList={salesInCharge} buttonEvent={handleClick} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SalesGrid saleList={salesShipped} buttonEvent={handleClick} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <SalesGrid saleList={salesDelivered} buttonEvent={handleClick} />
            </TabPanel>
        </div>

    );
}

export default SaleTabs;


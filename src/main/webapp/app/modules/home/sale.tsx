import React from 'react';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import saleState from './sale-state'
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#2A6A9E',
        color: 'white',
        "&:hover": {
            backgroundColor: "#5E99C5"
        },
        textTransform: 'capitalize',
    },
    buttonIcons: {
        margin: theme.spacing(0.4),
    },
}));

const Sale = ({ sale, buttonEvent }) => {

    const classes = useStyles();

    //Funcion para solicitar actualización del estado de una venta
    const putSale = (saleStateParam)=>{
        const authToken = JSON.parse(sessionStorage.getItem("jhi-authenticationToken"));

        const saleBody = {
            "deliveryDate": sale.deliveryDate,
            "fullPayment": sale.fullPayment,
            "id": sale.id,
            "paid": sale.paid,
            "product": sale.product,
            "provider": sale.provider,
            "state": saleStateParam
        };

        const putRequest = {
            method: 'PUT',
            headers: {
            'Authorization': `Bearer ${authToken}`,   
            'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(saleBody)
        };

        fetch("http://localhost:8080/api/sales",putRequest)
        .then(res => {buttonEvent();
                      saleStateParam === saleState.shipped ? alert(`La venta Nro ${sale.id} fue enviada correctamente`) : alert(`La venta Nro ${sale.id} fue entregada correctamente`)})
        .catch(error => error);
    };

    //Encapsulado para estado Enviado
    const saleShipped = () => {
        putSale(saleState.shipped);
    };

    //Encapsulado para estado Entregado
    const saleDelivered = () => {
        putSale(saleState.delivered);
    };

    return (
        <div>
            <Box borderTop={2} borderColor="grey.200" m={1} p={1} textAlign="center">
                <Grid container spacing={4} justify="center" alignItems="center">
                    <Grid item xs={2} >
                        <Typography variant="body1" color="initial">
                            {sale.id}
                        </Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography variant="body1" color="initial">
                            {sale.provider}
                        </Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography variant="body1" color="initial">
                            {sale.deliveryDate}
                        </Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography variant="body1" color="initial">
                            {sale.paid}
                        </Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography variant="body1" color="initial">
                            {sale.fullPayment}
                        </Typography>
                    </Grid>

                    <Grid item xs={2}>
                        {sale.state === saleState.inCharge ? 
                        (
                        <Button variant="contained" className={classes.button} onClick={saleShipped}>
                            Enviar <LocalShippingIcon className={classes.buttonIcons} />
                        </Button>
                        ):
                        (sale.state === saleState.shipped ? 
                            (
                            <Button variant="contained" className={classes.button} onClick={saleDelivered}>
                                 Entregar <CheckCircleIcon className={classes.buttonIcons} />
                            </Button>
                            ):
                            (   
                                <CheckCircleIcon className={classes.buttonIcons} />
                            )

                         )}
                        
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Sale;
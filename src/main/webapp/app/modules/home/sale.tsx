import React from 'react';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import saleState from './sale-state'

const Sale = ({ sale }) => {

    const saleShipped = () => {
        alert("Venta " + sale.id + " enviada")


    }

    const saleDelivered = () => {

        const authToken = JSON.parse(sessionStorage.getItem("jhi-authenticationToken"));

        const saleBody = {
            "deliveryDate": sale.deliveryDate,
            "fullPayment": sale.fullPayment,
            "id": sale.id,
            "paid": sale.paid,
            "product": sale.product,
            "provider": sale.provider,
            "state": "DELIVERED"
        };

        const putRequest = {
            method: 'PUT',
            headers: {
            'Authorization': `Bearer ${authToken}`,   
            'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(saleBody)
        };

        fetch("http://localhost:8080/api/sales",putRequest).then( res => sale.state=saleState.delivered).catch(error => error);
    }

    return (
        <div>
            <Box borderTop={2} borderColor="grey.200" m={1} p={1} textAlign="center">
                <Grid container spacing={2}>
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
                        <Button variant="contained" color="primary" onClick={saleShipped}>
                            Enviar
                        </Button>
                        ):
                        (sale.state === saleState.shipped ? 
                            (
                            <Button variant="contained" color="primary" onClick={saleDelivered}>
                                Entregar
                            </Button>
                            ):
                            (   
                            ""
                            )

                         )}
                        
                    </Grid>
                </Grid>
            </Box>

        </div>
    );
}

export default Sale;
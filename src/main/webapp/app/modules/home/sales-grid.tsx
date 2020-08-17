import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import Sale from './sale'

const SalesGrid = () => {

    const saleJson = {
        id: 1,
        provider: "alguien",
        deliveryDate: "11-11-2020",
        paid: 100,
        fullPayment: 100
    }

    return (
        <div>
            <Box m={2} textAlign="center">
                <Grid container spacing={2}>
                    <Grid item xs={2} >
                        <Typography variant="body1" color="initial">
                            Nro
                        </Typography>
                    </Grid>

                    <Grid item xs={2} >
                        <Typography variant="body1" color="initial">
                            Proveedor
                        </Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography variant="body1" color="initial">
                            Fecha de Entrega
                        </Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography variant="body1" color="initial">
                            Pagado
                        </Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography variant="body1" color="initial">
                            Pago Total
                        </Typography>
                    </Grid>

                    <Grid item xs={2}>

                    </Grid>
                </Grid>
            </Box>

            <Sale sale={saleJson}></Sale>
            <Sale sale={saleJson}></Sale>
        </div>
    );
}

export default SalesGrid;
import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import Sale from './sale'

const SalesGrid = ({saleList, buttonEvent}) => {

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

            {
                saleList.map(sale => (
                    <Sale key={sale.id} sale={sale} buttonEvent={buttonEvent}></Sale>
                ))
            }

        </div>
    );
}

export default SalesGrid;
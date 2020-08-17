import React from 'react';
import {Grid, Typography } from '@material-ui/core';

const SalesGrid = () => {
    return (
        <div>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography variant="h6" color="initial">
                    Nro
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography variant="h6" color="initial">
                    Proveedor
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography variant="h6" color="initial">
                    Fecha de Entrega
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography variant="h6" color="initial">
                    Pagado
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography variant="h6" color="initial">
                    Pago Total
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography variant="h6" color="initial">
                    Enviar
                </Typography>
              </Grid>
            </Grid>
        </div>
    );
}

export default SalesGrid;
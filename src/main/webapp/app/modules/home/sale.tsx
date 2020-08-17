import React from 'react';
import { Grid, Typography, Button, Box } from '@material-ui/core';

const Sale = ({ sale }) => {
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
                        <Button variant="contained" color="primary" >
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </div>
    );
}

export default Sale;
import { makeStyles } from "@material-ui/core";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import clsx from "clsx";
import { Booking } from "../../types/Booking";
import { formatCurrencyBRL } from "../../utils/formatCurrencyBRL";
import React from "react";

export const useStyles = makeStyles(() => ({
    tableHead: {
        fontWeight: "bold",
    },
    tableRowEven: {
        backgroundColor: '#131313',
    },
}));


export type SessionsTablesProps = {
    sessions: string[]
    bookings: Booking[]
}

export const SessionsTables = (props: SessionsTablesProps) => {
    const style = useStyles();

    return (
        <>
            {props.sessions?.map((session) => (
                <React.Fragment key={session}>
                    {props.bookings.filter(booking => booking.session === session).length > 0 &&
                        <Grid key={session} container spacing={2} direction="column">
                            <Grid item>
                                <Typography variant='h6' fontWeight={'bold'} sx={{ textAlign: 'left', marginY: '1rem' }}>{`Sessão ${session}`}</Typography>
                            </Grid>
                            <Grid item>
                                <Paper sx={{ padding: "1rem", display: 'flex', alignItems: 'center' }}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <TableContainer style={{ overflow: "auto" }}>
                                                <Table aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={clsx(style.tableHead)}>Nome</TableCell>
                                                            <TableCell className={clsx(style.tableHead)}>Assento</TableCell>
                                                            <TableCell className={clsx(style.tableHead)}>Valor</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {props.bookings.filter(booking => booking.session === session).map((booking, index) => (
                                                            <TableRow key={booking.id} className={index % 2 === 0 ? style.tableRowEven : ''}>
                                                                <TableCell>{booking.name}</TableCell>
                                                                <TableCell>{booking.seats.join(', ')}</TableCell>
                                                                <TableCell>{booking.value}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item sm={6} xs={12} sx={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'row' }}>
                                                <Typography variant='body1'>Total de Espectadores: </Typography>
                                                <Typography variant='body1' sx={{ marginX: '1rem' }}>{props.bookings.filter(booking => booking.session === session).length}</Typography>
                                            </Grid>
                                            <Grid item sm={6} xs={12} sx={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'row' }}>
                                                <Typography variant='body1'>Total de Receita: </Typography>
                                                <Typography variant='body1' sx={{ marginX: '1rem' }}>
                                                    {formatCurrencyBRL.format(props.bookings.filter(booking => booking.session === session).reduce((total, booking) => total + booking.value, 0))}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    }
                </React.Fragment>
            ))}
        </>

    );
}
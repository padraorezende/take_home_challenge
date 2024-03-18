import AlertIcon from '@mui/icons-material/Warning'
import { Box, Grid, Paper, Typography } from "@mui/material"
import { CarouselFilms } from "../../components/CarouselFilms/CarouselFilms"
import { SessionsTables } from "../../components/SessionTable/SessionsTables"
import { Booking } from "../../types/Booking"
import { Film } from "../../types/Film"
import { formatCurrencyBRL } from "../../utils/formatCurrencyBRL"

export type ManagerPageProps = {
    films: Film[]
    selectedFilm: Partial<Film>
    onSelectedFilm: (film: Film) => void
    bookings: Booking[]
}

export const ManagerPage = (props: ManagerPageProps) => {
    return (
        <>
            <CarouselFilms films={props.films} onSelectedFilm={props.onSelectedFilm} />

            {!props.selectedFilm ? <>
                <Typography variant='h4' sx={{ margin: "2rem auto", textAlign: 'center', fontWeight: 'bold' }}>SELECIONE UM FILME</Typography>
                <Typography variant='body1' sx={{ margin: "2rem auto", textAlign: 'center' }}>Para visualizar mais detalhes</Typography>
            </>
                : <>
                    {props.bookings
                        .map(booking => booking.seats.length)
                        .reduce((accumulator, currentValue) => accumulator + currentValue, 0) > 0 ?
                        <>
                            <Grid container maxWidth="lg" justifyContent="center" alignContent={"center"} spacing={2} sx={{ padding: '1rem', alignItems: 'center', margin: 'auto', width: '100%'}}>
                                <Grid item xs={12} md={12} lg={3}>
                                    <Grid container direction="column" alignItems="center" spacing={2}>
                                        <Grid item>
                                            <img src={props.selectedFilm.url} style={{ height: '350px', width: '250px', objectFit: 'cover', borderRadius: "10px", marginTop: "0.5rem" }} />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={12} lg={9}>
                                    <Typography variant='h6' sx={{ textAlign: 'left', marginBottom: '3rem' }}>{props.selectedFilm.name}</Typography>
                                    <Grid container sx={{ alignContent: 'center' }} spacing={2}>
                                        <Grid item xs={12} md={12} lg={6}>
                                            <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1, flexShrink: 1 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginY: '4rem', marginX: '2rem' }}>
                                                    <Typography variant='h6'>Total de<br />Espectadores</Typography>
                                                    <Typography variant='h5' fontWeight={'bold'}>
                                                        {props.bookings
                                                            .map(booking => booking.seats.length)
                                                            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                                                        }
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={6}>
                                            <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1, flexShrink: 1 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginY: '4rem', marginX: '2rem' }}>
                                                    <Typography variant='h6'>Total de<br />Receita</Typography>
                                                    <Typography variant='h5' fontWeight={'bold'}>
                                                        {formatCurrencyBRL.format(props.bookings
                                                            .map(booking => booking.seats.length * booking.value)
                                                            .reduce((accumulator, currentValue) => accumulator + currentValue, 0))}
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid container maxWidth="lg" justifyContent="center" alignContent="center" spacing={2} sx={{ padding: '1rem', margin: 'auto',  width: '100%'}}>
                                <SessionsTables bookings={props.bookings} sessions={props.selectedFilm?.sessions?.map(s => s.session)} />
                            </Grid>
                        </>
                        :
                        <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
                            <AlertIcon color='warning' sx={{ fontSize: '3rem', marginBottom: '1rem' }} />
                            <Typography variant='body1' sx={{ margin: "2rem auto", textAlign: 'center' }}>Infelizmente ainda não foi comprado nenhum ingresso para o filme: {props.selectedFilm.name}!</Typography>
                        </Grid>
                    }

                </>
            }
        </>
    )
}
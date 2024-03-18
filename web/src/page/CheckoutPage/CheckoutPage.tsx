import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Chip, Container, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Typography } from "@mui/material";
import { FormCheckout } from "../../components/FormCheckout/FormCheckout";
import { Seats } from "../../components/Seats/Seats";
import { Film } from "../../types/Film";
import { Session } from "../../types/Session";
import { formatCurrencyBRL } from "../../utils/formatCurrencyBRL";

export type CheckoutPageProps = {
    selectedFilm: Partial<Film>
    selectedSession: Partial<Session>
    bookingSeats: string[]
    selectedSeats: string[]
    onSelectedSession: (session: Partial<Session>) => void
    onToogleSeatClick: (seat: string) => void
    onHandleBookingSubmit: (name: string) => void
}

export const CheckoutPage = (props: CheckoutPageProps) => {
    return (
        <>
            <div>
                <Container maxWidth="lg" sx={{ marginBottom: '2rem', marginTop: '2rem'}}>
                    <Grid container gap={2}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ padding: "1rem", height: "100%" }}>
                                    <Box display={"flex"} flexDirection={"column"} rowGap={1}>
                                        <img src={props.selectedFilm?.url} style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: "10px" }} />
                                        <Typography variant='h5'>{props.selectedFilm?.name}</Typography>
                                        <Typography variant='body1' sx={{ textAlign: 'justify' }}><strong>Sinopse:</strong> {props.selectedFilm?.sinopse}</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Paper sx={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem",  height: "100%"}}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography variant='h6' style={{ marginRight: '1rem' }}>Qual sessão?</Typography>
                                        {props.selectedFilm?.sessions?.length > 0 && props.selectedFilm.sessions.map(s =>
                                            <Chip key={s.session} label={s.session} variant={s.session === props.selectedSession?.session ? "filled" : "outlined"} onClick={() => props.onSelectedSession(s)} />
                                        )}
                                    </Box>
                                    {props.selectedSession &&
                                        <Paper sx={{ padding: "1rem", marginTop: "1rem" }}>
                                            <Typography variant='h6'>Selecione seu(s) assento(s)</Typography>
                                            <Typography variant='h6' margin=" 1rem 0" sx={{ textAlign: "center", border: "1px solid", borderColor: "primary.default" }}>Tela</Typography>
                                            <Seats lockSeats={props.bookingSeats} selectedSeats={props.selectedSeats} toogleSeatClick={props.onToogleSeatClick} />
                                        </Paper>
                                    }
                                </Paper>
                            </Grid>
                        </Grid>


                        {Boolean(props.selectedSeats.length) &&
                            <>
                                <Grid item xs={12}>
                                    <Paper sx={{ padding: "1rem", marginBottom: "1rem" }}>
                                        <Typography variant='subtitle2' sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ShoppingCartIcon sx={{ mr: 1 }} />
                                            Carrinho
                                        </Typography>
                                        <List sx={{ padding: 0 }}>
                                            {props.selectedSeats.map(seat => (
                                                <ListItem key={seat} disableGutters>
                                                    <ListItemText primary={`Assento ${seat}`} />
                                                    <ListItemSecondaryAction>
                                                        <IconButton onClick={() => props.onToogleSeatClick(seat)}>
                                                            <DeleteOutlineIcon color='error' />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            ))}
                                        </List>
                                        <Divider />
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                                            <Typography variant="subtitle1">Total:</Typography>
                                            <Typography variant="subtitle1">{formatCurrencyBRL.format(props.selectedSeats.length * (props.selectedSession?.value || 0))}</Typography>
                                        </Box>
                                    </Paper>
                                    <FormCheckout bookingSubmit={{ name: "" }} onSave={props.onHandleBookingSubmit} />
                                </Grid>
                            </>
                        }
                    </Grid>
                </Container>
            </div>
        </>
    )
}
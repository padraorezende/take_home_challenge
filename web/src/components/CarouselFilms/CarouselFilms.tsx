import { Box, Grid, Link } from "@mui/material"
import { Film } from "../../types/Film"


export type CarouselFilmsProps = {
    films: Film[]
    onSelectedFilm: (films: Film) => void
}

export const CarouselFilms = (props: CarouselFilmsProps) => {
    return (
        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ padding: '1rem', marginBottom: "4rem" }}>
            <Grid item xs={10} >
                <Box display="flex" sx={{ columnGap: "1.5em", padding: "1rem", overflowX: 'auto', '&::-webkit-scrollbar': { height: '10px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'red', borderRadius: "6px" } }}>
                    {props.films.map(film =>
                        <Link key={film.id} href="#" underline='none' onClick={() => props.onSelectedFilm(film)} data-testid="film-display">
                            <Grid sx={{ padding: "0.5rem", borderRadius: "0.5rem", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', '&:hover': { border: "1px solid", borderColor: "primary.dark", filter: 'brightness(85%)' } }}>
                                <img src={film.url} style={{ height: '350px', width: '250px', objectFit: 'cover', borderRadius: "10px", marginTop: "0.5rem" }} />
                            </Grid>
                        </Link>
                    )}
                </Box>
            </Grid>
        </Grid>
    )
}
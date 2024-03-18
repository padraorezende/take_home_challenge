import { Grid, Typography } from "@mui/material"
import { Trending } from "../../types/Trending"

export type NewFilmsPageProps = {
    trendings: Trending[]
}

export const NewFilmsPage = (props: NewFilmsPageProps) => {
    return (
        <>
            <Grid container spacing={3}>
                {props.trendings?.length> 0 && props.trendings.map((film) => (
                    <Grid item key={film.id} xs={12} sm={6} md={4} lg={3}>
                        <Grid container direction="column">
                            <Grid item>
                                <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} style={{ maxWidth: '100%' }} />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">{film.title}</Typography>
                                <Typography variant="body2">Popularity: {film.popularity}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
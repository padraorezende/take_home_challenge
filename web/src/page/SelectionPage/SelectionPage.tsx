import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Grid, IconButton, Typography, styled } from "@mui/material";
import { useEffect, useState } from 'react';
import armchairImg from '../../assets/armchair.jpg';
import roomImg from '../../assets/room.jpg';
import { CarouselFilms } from '../../components/CarouselFilms/CarouselFilms';
import { Film } from "../../types/Film";

export type SelectionPageProps = {
    films: Film[]
    onSelectedFilm: (films: Film) => void
}

const StyledIconButton = styled(IconButton)({
    color: 'red',
    '& svg': {
        fontSize: '4rem',
        transition: 'transform 0.3s',
        animation: 'moveUpDown 1s infinite alternate',
    },
    '&:hover svg': {
        transform: 'rotate(180deg)',
    },
    '@keyframes moveUpDown': {
        '0%': {
            transform: 'translateY(0)',
        },
        '100%': {
            transform: 'translateY(5px)',
        },
    },
});


export const SelectionPage = (props: SelectionPageProps) => {
    const [showIcon, setShowIcon] = useState(true);

    const handleButtonClick = () => {
        const filmDisplaySection = document.getElementById('list-films');
        if (filmDisplaySection) {
            filmDisplaySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.clientHeight;

        if (scrollPosition > windowHeight * 0.5 || documentHeight < windowHeight * 2) {
            setShowIcon(false);
        } else {
            setShowIcon(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Grid container justifyContent="center">
                <img alt="Cinemark Room" src={roomImg} style={{ height: 'auto', width: '100%', maxWidth: '100%', objectFit: 'cover' }} />
            </Grid>
            <Grid container justifyContent="center">
                <img alt="Cinemark Armchair" src={armchairImg} style={{ height: 'auto', width: '100%', maxWidth: '100%', objectFit: 'cover' }} />
            </Grid>

            {showIcon && (
                <Grid item xs={12} sx={{ position: 'absolute', top: '90%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <StyledIconButton color="primary" onClick={handleButtonClick}>
                        <ArrowDownwardIcon />
                    </StyledIconButton>
                </Grid>
            )}

            <Typography variant='h4' sx={{ marginTop: "2rem", textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Filmes em cartaz</Typography>
            <Typography variant='body1' sx={{ textAlign: 'center', color: "red", letterSpacing: '0.05em' }}>Venha relembrar esses filmes icônicos do cinema</Typography>

            <Grid id="list-films">
                <CarouselFilms films={props.films} onSelectedFilm={props.onSelectedFilm} />
            </Grid >
        </>
    )
}
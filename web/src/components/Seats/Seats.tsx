import { Grid, IconButton } from "@mui/material"
import ChairIcon from '@mui/icons-material/Chair';

export type SeatsProps = {
  lockSeats: string[]
  selectedSeats: string[]
  toogleSeatClick: (seat: string) => void
}

export const Seats = (props: SeatsProps) => {

  const CINEMA_ROOM_SIZE = Object.freeze({
    rows: 10,
    columns: 15,
  });

  const mobileZoomStyle = {
    '@media (max-width:986px)': {
      zoom: '60%',
    },
    '@media (max-width:745px)': {
      zoom: '45%',
    },
  };

  return (
    <Grid display={"flex"} flexDirection={'column'} alignItems={"center"}>
      {Array.from({ length: CINEMA_ROOM_SIZE.rows + 1 }).map((_, r) =>
        <Grid key={r} item>
          {Array.from({ length: CINEMA_ROOM_SIZE.columns }).map((_, c) => {
            const seat = `${String.fromCharCode(r + 65)}${c + 1}`;
            return (
              <IconButton key={c} title={seat} disabled={props.lockSeats.includes(seat)} onClick={() => props.toogleSeatClick(seat)} sx={mobileZoomStyle}>
                {props.selectedSeats.includes(seat) ? <ChairIcon color='success' /> : <ChairIcon />}
              </IconButton>
            )
          })}
        </Grid>
      )}
    </Grid>
  )
}
import { Backdrop, CircularProgress, createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export type AppBackdropProps = {
  show: boolean
}

export const AppBackdrop = (props: AppBackdropProps) => {
  const classes = useStyles();

  return <Backdrop className={classes.backdrop} open={props.show}>
    <CircularProgress color="inherit" />
  </Backdrop>
}

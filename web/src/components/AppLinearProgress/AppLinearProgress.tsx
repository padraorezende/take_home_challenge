import { makeStyles, Theme, createStyles, LinearProgress } from "@material-ui/core";


export type AppLinearProgressProps = {
    show: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);

export const AppLinearProgress = (props: AppLinearProgressProps) => {
    const classes = useStyles();

    return <>
        {props.show ? <LinearProgress className={classes.root} /> : <></>}
    </>
}
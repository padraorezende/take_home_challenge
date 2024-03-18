import { Toolbar, createStyles, makeStyles } from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Grid, IconButton } from "@mui/material";
import logo from '../../assets/logo.svg';

const useStyles = makeStyles(() => createStyles({
    topbar: {
        display: 'flex',
        justifyContent: 'center'
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center'
    }
}))

export type TopBarProps = {
    onClickMenu: () => void
}

export const TopBar = (props: TopBarProps) => {
    const classes = useStyles();

    return (
        <div className={classes.topbar}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={() => props.onClickMenu()}
                        color="inherit"
                        edge="start"
                        id="menu_TopBar">
                        <MenuIcon />
                    </IconButton>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Grid container className={classes.logoContainer} spacing={2}>
                                <Grid item>
                                    <Avatar alt="CineMark" src={logo} sx={{ width: 200, height: 80 }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

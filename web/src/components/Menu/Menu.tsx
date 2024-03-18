import { makeStyles } from "@material-ui/core";
import { Avatar, Divider, Drawer, List, ListItem, ListItemText } from "@mui/material";
import logo from '../../assets/logo.svg';

export type MenuProps = {
    open: boolean;
    onMenuFilms: () => void
    onMenuNewMovies: () => void
    onMenuManagement: () => void
    onClose: () => void;
};

const useStyles = makeStyles({
    menu: {
        marginTop: '2rem',
        width: 250,
    },
    listItemText: {
        fontSize: "14px",
    },
});

export const Menu = (props: MenuProps) => {
    const classes = useStyles();
    const menuList = [
        {
            onclick: () => props.onMenuNewMovies(),
            title: "Novos Lançamentos",
        },
        {
            onclick: () => props.onMenuFilms(),
            title: "Filmes",
        },
        {
            onclick: () => props.onMenuManagement(),
            title: "Gerênciamento",
        },
    ];

    menuList.sort((menuItem1, menuItem2) => (menuItem1.title < menuItem2.title ? -1 : menuItem1.title > menuItem2.title ? 1 : 0));

    return (
        <>
            <Drawer anchor="left" open={props.open} onClose={() => props.onClose()}>
                <div className={classes.menu}>
                    <Avatar alt="CineMark" src={logo} sx={{ width: 200, height: 80, marginX: '1rem' }} />

                    <Divider sx={{ marginTop: '1rem' }} />

                    <List>
                        {menuList.map((item) => (
                            <ListItem key={item.title} button onClick={item.onclick}>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary={item.title}
                                ></ListItemText>
                            </ListItem>
                        ))}

                    </List>
                </div>
            </Drawer>
        </>
    )
}
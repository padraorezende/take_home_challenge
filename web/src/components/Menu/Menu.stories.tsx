import { Menu, MenuProps } from "./Menu"
import { action } from "@storybook/addon-actions"

export default {
    title: "Components/Menu",
    component: Menu
}

const propsBase: MenuProps = {
    open: true,
    onMenuNewMovies: action("onMenuManagement"),
    onMenuManagement: action("onMenuManagement"),
    onMenuFilms: action("onMenuFilms"),
    onClose: action("onClose")
}

export const menu = () => <Menu {...propsBase} />

export const menuHidden = () => <Menu {...propsBase} open={false} />
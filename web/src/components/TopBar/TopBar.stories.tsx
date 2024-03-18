import { TopBar } from "./TopBar"
import { action } from "@storybook/addon-actions"

export default {
    title: "Components/TopBar",
    component: TopBar
}

export const topBar = () => <TopBar onClickMenu={action("onClickMenu")} />
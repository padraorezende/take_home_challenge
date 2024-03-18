import { AppBackdrop } from "./AppBackdrop"

export default {
    title: "Components/AppBackdrop",
    component: AppBackdrop
}

export const appBackdrop = () => <AppBackdrop show />

export const appBackdropDontShow = () => <AppBackdrop show={false} />
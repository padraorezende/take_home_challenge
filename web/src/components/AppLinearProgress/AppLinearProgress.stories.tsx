import { AppLinearProgress } from "./AppLinearProgress"

export default {
    title: "Components/AppLinearProgress",
    component: AppLinearProgress
}

export const appLinearProgress = () => <AppLinearProgress show />

export const appLinearProgressDontShow = () => <AppLinearProgress show={false} />
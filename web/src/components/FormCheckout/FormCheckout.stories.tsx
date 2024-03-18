import { FormCheckout, FormCheckoutProps } from "./FormCheckout"
import { action } from "@storybook/addon-actions"

export default {
    title: "Components/FormCheckout",
    component: FormCheckout
}

const propsBase: FormCheckoutProps = {
    bookingSubmit: {
        name: "Lucas Padrão"
    },
    onSave: action("action")
}

export const formCheckout = () => <FormCheckout {...propsBase} />

export const formCheckoutWithOutBookingSubmit = () => <FormCheckout {...propsBase} bookingSubmit={{}} />

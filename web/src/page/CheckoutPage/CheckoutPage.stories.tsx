import { CheckoutPage, CheckoutPageProps } from "./CheckoutPage"
import { action } from "@storybook/addon-actions"

export default {
    title: "Pages/CheckoutPage",
    component: CheckoutPage
}

const propsBase: CheckoutPageProps = {
    selectedFilm: {
        "id": "1",
        "name": "Titanic",
        "sinopse": "Um romance trágico floresce entre um passageiro pobre e uma aristocrata a bordo do \"inafundável\" RMS Titanic, enfrentando a catástrofe iminente.",
        "url": "https://image.tmdb.org/t/p/original/vpsvHLkoeKUjceIMeNSqCp3xEyY.jpg",
        "sessions": [
            {
                "session": "15:00",
                "value": 10
            },
            {
                "session": "17:00",
                "value": 10
            },
            {
                "session": "19:30",
                "value": 15
            }
        ]
    },
    selectedSession: {
        "session": "15:00",
        "value": 10
    },
    bookingSeats: ['A1', 'A2', 'A3', 'A4', 'A5', 'F1', 'F2'],
    selectedSeats: [
        "B7",
        "B8"
    ],
    onSelectedSession: action("onSelectedSession"),
    onToogleSeatClick: action("onToogleSeatClick"),
    onHandleBookingSubmit: action("onHandleBookingSubmit"),
}

export const checkoutPage = () => <CheckoutPage {...propsBase} />

export const checkoutPageWithOutSelectedSession = () => <CheckoutPage {...propsBase} selectedSession={{}} />

export const checkoutPageWithOutSelectedSeats = () => <CheckoutPage {...propsBase} selectedSeats={[]} />

export const checkoutPageWithOutBookingSeats = () => <CheckoutPage {...propsBase} bookingSeats={[]} />

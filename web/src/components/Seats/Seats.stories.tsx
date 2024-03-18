import { Seats, SeatsProps } from "./Seats"
import { action } from "@storybook/addon-actions"

export default {
    title: "Components/Seats",
    component: Seats
}

const propsBase: SeatsProps = {
    lockSeats: ['A6', 'A7', 'A8'],
    selectedSeats: ['B7', 'B8', 'A1', 'A2', 'A3', 'A4', 'A5', 'F1', 'F2'],
    toogleSeatClick: action("toogleSeatClick")
}

export const seats = () => <Seats {...propsBase} />

export const seatsWithOutLockSeats = () => <Seats {...propsBase} lockSeats={[]} />

export const seatsWithOutSelectedSeats = () => <Seats {...propsBase} selectedSeats={[]} />

export const seatsWithOutSelectedSeatsAndLockSeats = () => <Seats {...propsBase} selectedSeats={[]} lockSeats={[]} />
import { SessionsTables, SessionsTablesProps } from "./SessionsTables"

export default {
    title: "Components/SessionsTables",
    component: SessionsTables
}

const propsBase: SessionsTablesProps = {
    bookings: [
        {
            "id": "1",
            "filmId": "1",
            "session": "15:00",
            "name": "Tiago",
            "seats": [
                "B7",
                "B8"
            ],
            "value": 20
        },
        {
            "id": "15ed",
            "filmId": "1",
            "session": "15:00",
            "name": "Lucas Gabriel",
            "seats": [
                "A1",
                "A2",
                "A3",
                "A4",
                "A5"
            ],
            "value": 50
        },
        {
            "id": "ab02",
            "filmId": "1",
            "session": "17:00",
            "name": "João",
            "seats": [
                "A4"
            ],
            "value": 10
        },
        {
            "id": "8253",
            "filmId": "1",
            "session": "15:00",
            "name": "Rafael Pedrosa",
            "seats": [
                "F1",
                "F2"
            ],
            "value": 20
        }
    ],
    sessions: [
        "15:00",
        "17:00",
        "19:30",
    ]
}

export const sessionsTables = () => <SessionsTables {...propsBase} />
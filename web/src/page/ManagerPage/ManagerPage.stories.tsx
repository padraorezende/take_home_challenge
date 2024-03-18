import { ManagerPage, ManagerPageProps } from "./ManagerPage"
import { action } from "@storybook/addon-actions"

export default {
    title: "Pages/ManagerPage",
    component: ManagerPage
}

const propsBase: ManagerPageProps = {
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
    films: [
        {
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
        {
            "id": "2",
            "name": "De volta para o Futuro",
            "sinopse": "Um adolescente viaja no tempo em um DeLorean modificado e tenta garantir que seus pais se apaixonem para preservar seu futuro.",
            "url": "https://i.pinimg.com/originals/91/11/57/911157d7fafe13b698e914117f919d6b.jpg",
            "sessions": [
                {
                    "session": "15:00",
                    "value": 10
                },
                {
                    "session": "17:00",
                    "value": 15
                }
            ]
        },
        {
            "id": "3",
            "name": "Quarteto fantástico",
            "sinopse": "Um grupo de super-heróis adquire poderes após um acidente cósmico e enfrenta um inimigo que busca usar seus dons para o mal.",
            "url": "https://br.web.img3.acsta.net/pictures/14/04/02/18/17/010475.jpg",
            "sessions": [
                {
                    "session": "17:00",
                    "value": 5
                },
                {
                    "session": "20:30",
                    "value": 8
                }
            ]
        },
        {
            "id": "4",
            "name": "Cidade Invisível",
            "sinopse": "Um policial descobre um mundo oculto de entidades folclóricas em guerra enquanto investiga uma série de misteriosas mortes no Rio de Janeiro.",
            "url": "https://br.web.img3.acsta.net/pictures/21/01/20/17/31/5372090.jpg",
            "sessions": [
                {
                    "session": "17:00",
                    "value": 10
                },
                {
                    "session": "21:30",
                    "value": 15
                }
            ]
        },
        {
            "id": "5",
            "name": "Superman",
            "sinopse": "O herói alienígena Kryptoniano, Superman, protege a Terra dos perigos enquanto lida com suas próprias origens e dilemas morais.",
            "url": "https://i.pinimg.com/474x/79/66/22/796622f864543ffab967b1f09e225f26.jpg",
            "sessions": [
                {
                    "session": "13:30",
                    "value": 10
                },
                {
                    "session": "15:30",
                    "value": 20
                }
            ]
        },
        {
            "id": "6",
            "name": "Era uma Vez em Hollywood",
            "sinopse": "Um ator e seu dublê lutam para encontrar sucesso em uma indústria em mudança durante os anos 60 em Los Angeles.",
            "url": "https://br.web.img3.acsta.net/pictures/19/08/06/21/50/5749668.jpg",
            "sessions": [
                {
                    "session": "14:00",
                    "value": 15
                }
            ]
        },
        {
            "id": "7",
            "name": "ET",
            "sinopse": "Um jovem garoto faz amizade com um alienígena perdido e tenta ajudá-lo a voltar para casa enquanto foge do governo.",
            "url": "https://gcdn.emol.cl/los-80/files/2016/11/poster_ET.jpg",
            "sessions": [
                {
                    "session": "15:00",
                    "value": 10
                }
            ]
        },
        {
            "id": "8",
            "name": "Avengers",
            "sinopse": "Os Vingadores, um grupo de super-heróis da Marvel, unem forças para combater ameaças globais. Juntos, enfrentam vilões poderosos e protegem o universo, mostrando coragem, união e heroísmo em batalhas épicas.",
            "url": "https://image.tmdb.org/t/p/original/pdhOE0NAZaPzjsgTvatRP1xFhG3.jpg",
            "sessions": [
                {
                    "session": "16:30",
                    "value": 15
                },
                {
                    "session": "21:00",
                    "value": 20
                }
            ]
        },
        {
            "id": "9",
            "name": "Ironman",
            "sinopse": "O magnata Tony Stark constrói uma armadura tecnologicamente avançada para se tornar o herói blindado conhecido como Homem de Ferro.",
            "url": "https://i.pinimg.com/originals/81/5e/f1/815ef195c13661a7621d9ca3f40ce271.jpg",
            "sessions": [
                {
                    "session": "15:00",
                    "value": 15
                },
                {
                    "session": "17:00",
                    "value": 15
                },
                {
                    "session": "19:30",
                    "value": 20
                }
            ]
        },
        {
            "id": "10",
            "name": "Rambo 4",
            "sinopse": "O veterano de guerra John Rambo é convocado para uma missão perigosa de resgate em Mianmar, enfrentando seu passado e inimigos mortais.",
            "url": "https://i.pinimg.com/originals/a5/2e/9c/a52e9c4edb2160a585b8ae7b10908676.jpg",
            "sessions": [
                {
                    "session": "15:00",
                    "value": 10
                },
                {
                    "session": "17:00",
                    "value": 15
                },
                {
                    "session": "19:30",
                    "value": 20
                }
            ]
        }
    ],
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
    onSelectedFilm: action("onSelectedFilm")
}

export const managerPage = () => <ManagerPage {...propsBase} />

export const managerPageWithOutSelectedFilm = () => <ManagerPage {...propsBase} selectedFilm={null} />

export const managerPageWithOutBooking = () => <ManagerPage {...propsBase} bookings={[]} />

export const managerPageWithOutBookingAndSelectedFilm = () => <ManagerPage {...propsBase} bookings={[]} selectedFilm={{}} />
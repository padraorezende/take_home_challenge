import { SelectionPage, SelectionPageProps } from "./SelectionPage"
import { action } from "@storybook/addon-actions"

export default {
    title: "Pages/SelectionPage",
    component: SelectionPage
}

const propsBase: SelectionPageProps = {
    films:
        [
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
        ],
    onSelectedFilm: action("onSelectedFilm")
}

export const selectionPage = () => <SelectionPage {...propsBase} />

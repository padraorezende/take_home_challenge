import { Route, Routes, useParams } from "react-router-dom"
import { CheckoutPageContainer } from "../page/CheckoutPage/CheckoutPageContainer"
import { SelectionContainer } from "../page/SelectionPage/SelectionPageContainer"
import { NewFilmsPageContainer } from "../page/NewFilmsPage/NewFilmsPageContainer"
import { ManagerPageContainer } from "../page/ManagerPage/ManagerPageContainer"


const CheckoutPageRoute = () => {
    const { IdFilm } = useParams<{ IdFilm: string }>()
    return <CheckoutPageContainer idFilm={IdFilm == null ? null : IdFilm} />
}

export const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<SelectionContainer />} />

            <Route path="/checkout/:IdFilm" element={<CheckoutPageRoute />} />

            <Route path="/newMovies" element={<NewFilmsPageContainer />} />

            <Route path="/manager" element={<ManagerPageContainer />} />
        </Routes>
    )
}


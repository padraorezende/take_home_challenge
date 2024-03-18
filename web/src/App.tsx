import { CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'
import { AppBackdrop } from './components/AppBackdrop/AppBackdrop'
import { AppLinearProgress } from './components/AppLinearProgress/AppLinearProgress'
import { ShowAlertContainer } from './components/ShowAlert/ShowAlertContainer'
import { TopBar } from './components/TopBar/TopBar'
import { RootState } from './redux/RootState'
import { Rotas } from './routes/Rotas'
import { useState } from 'react'
import { Menu } from './components/Menu/Menu'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()
  const realizandoProcessamento = useSelector((state: RootState) => state.realizandoProcessamento)
  const [mostrarMenuLateral, setMostrarMenuLateral] = useState(false)

  return (
    <>
      <TopBar onClickMenu={() => setMostrarMenuLateral(true)} />

      <Menu
        open={mostrarMenuLateral}
        onClose={() => setMostrarMenuLateral(false)}
        onMenuFilms={() => {
          setMostrarMenuLateral(false)
          navigate('/')
        }}
        onMenuManagement={() => {
          setMostrarMenuLateral(false)
          navigate('/manager')
        }}
        onMenuNewMovies={() => {
          setMostrarMenuLateral(false)
          navigate('/newMovies')
        }}

      />

      <main>

        <AppLinearProgress show={realizandoProcessamento == "PASSIVO"} />

        <AppBackdrop show={realizandoProcessamento == "ATIVO"} />

        <ShowAlertContainer />

        <CssBaseline />

        <Rotas />

      </main>

    </>
  )
}

export default App

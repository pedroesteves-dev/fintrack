import { createBrowserRouter } from 'react-router'
import AppLayout from './layouts/AppLayout'
import Analises from './pages/Analises'
import Configuracoes from './pages/Configuracoes'
import Historico from './pages/Historico'
import Inicio from './pages/Inicio'
import Metas from './pages/Metas'
import NaoEncontrada from './pages/NaoEncontrada'
import Notificacoes from './pages/Notificacoes'
import Perfil from './pages/Perfil'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: Inicio },
      { path: 'historico', Component: Historico },
      { path: 'metas', Component: Metas },
      { path: 'analises', Component: Analises },
      { path: 'configuracoes', Component: Configuracoes },
      { path: 'perfil', Component: Perfil },
      { path: 'notificacoes', Component: Notificacoes },
      { path: '*', Component: NaoEncontrada },
    ],
  },
])

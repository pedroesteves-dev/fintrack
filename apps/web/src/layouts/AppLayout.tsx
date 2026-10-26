import { Outlet } from 'react-router'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import NotificationsProvider from '../contexts/NotificationsProvider'

function AppLayout() {
  const handleLogout = () => {}

  return (
    <NotificationsProvider>
      <div className="min-h-screen bg-page font-sans text-slate-900">
        <Sidebar onLogout={handleLogout} />

        <div className="ml-60">
          <Header userName="João Silva" onLogout={handleLogout} />

          <main className="px-8 pb-8">
            <Outlet />
          </main>
        </div>
      </div>
    </NotificationsProvider>
  )
}

export default AppLayout

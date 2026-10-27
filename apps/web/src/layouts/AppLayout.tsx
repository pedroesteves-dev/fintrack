import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import NotificationsProvider from '../contexts/NotificationsProvider'
import TransactionsProvider from '../contexts/TransactionsProvider'
import { currentUser } from '../data/user'

function AppLayout() {
  const handleLogout = () => {}
  const { pathname } = useLocation()

  return (
    <NotificationsProvider>
      <TransactionsProvider>
        <div className="min-h-screen bg-page font-sans text-slate-900">
          <Sidebar onLogout={handleLogout} />

          <div className="ml-60">
            <Header userName={currentUser.name} onLogout={handleLogout} />

            <main className="px-8 pb-8">
              <div key={pathname} className="animate-page-enter">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
        <ScrollRestoration />
      </TransactionsProvider>
    </NotificationsProvider>
  )
}

export default AppLayout

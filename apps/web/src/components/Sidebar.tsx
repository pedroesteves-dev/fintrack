import type { IconType } from 'react-icons'
import { FaLeaf } from 'react-icons/fa'
import { MdBarChart, MdHome, MdLogout, MdPieChart, MdSettings } from 'react-icons/md'
import { TbTargetArrow } from 'react-icons/tb'
import { NavLink } from 'react-router'

type NavItem = {
  to: string
  label: string
  icon: IconType
}

const navItems: NavItem[] = [
  { to: '/', label: 'Início', icon: MdHome },
  { to: '/historico', label: 'Histórico', icon: MdPieChart },
  { to: '/metas', label: 'Metas', icon: TbTargetArrow },
  { to: '/analises', label: 'Análises', icon: MdBarChart },
  { to: '/configuracoes', label: 'Configurações', icon: MdSettings },
]

const itemClassName =
  'flex cursor-pointer items-center gap-3.5 rounded-lg px-3 py-3 text-left text-[15px] font-medium transition-colors'

type SidebarProps = {
  onLogout: () => void
}

function Sidebar({ onLogout }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 flex w-60 flex-col bg-sidebar px-3 py-5 text-sidebar-muted">
      <div className="mb-8 flex items-center gap-2.5 px-3">
        <FaLeaf className="size-6 text-white" aria-hidden />
        <span className="text-2xl font-bold tracking-tight text-white">FinTrack</span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${itemClassName} ${isActive ? 'bg-sidebar-active text-white' : 'hover:bg-white/5 hover:text-white'}`
            }
          >
            <Icon className="size-6 shrink-0" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className={`mt-auto ${itemClassName} hover:bg-white/5 hover:text-white`}
      >
        <MdLogout className="size-6 shrink-0" aria-hidden />
        Sair
      </button>
    </aside>
  )
}

export default Sidebar

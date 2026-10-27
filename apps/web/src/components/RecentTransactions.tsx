import { MdArrowForward, MdListAlt } from 'react-icons/md'
import { Link } from 'react-router'
import { sortByMostRecent } from '../data/transactions'
import { useTransactions } from '../hooks/useTransactions'
import ChartCard from './ChartCard'
import TransactionsTable from './TransactionsTable'

const RECENT_LIMIT = 5

type RecentTransactionsProps = {
  isHidden: boolean
}

function RecentTransactions({ isHidden }: RecentTransactionsProps) {
  const { transactions } = useTransactions()
  const recent = sortByMostRecent(transactions).slice(0, RECENT_LIMIT)

  return (
    <ChartCard
      title="Movimentações recentes"
      icon={MdListAlt}
      actions={
        <Link
          to="/historico"
          className="group flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-brand transition-all duration-150 hover:bg-avatar/40 active:scale-95"
        >
          Ver todas
          <MdArrowForward className="size-4 transition-transform duration-150 group-hover:translate-x-1" aria-hidden />
        </Link>
      }
    >
      <TransactionsTable transactions={recent} isHidden={isHidden} />
    </ChartCard>
  )
}

export default RecentTransactions

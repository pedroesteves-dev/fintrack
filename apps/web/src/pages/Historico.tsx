import { useState } from 'react'
import { MdAdd, MdSearch } from 'react-icons/md'
import NewTransactionModal from '../components/NewTransactionModal'
import TransactionsTable from '../components/TransactionsTable'
import { getCategory } from '../data/categories'
import { type NewTransaction, sortByMostRecent, type TransactionType } from '../data/transactions'
import { useTransactions } from '../hooks/useTransactions'

type Filter = 'todas' | TransactionType

const filters: { id: Filter; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'income', label: 'Ganhos' },
  { id: 'expense', label: 'Gastos' },
]

function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

function Historico() {
  const { transactions, addTransaction } = useTransactions()
  const [filter, setFilter] = useState<Filter>('todas')
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const query = normalize(search.trim())
  const visibleTransactions = sortByMostRecent(transactions).filter((transaction) => {
    if (filter !== 'todas' && transaction.type !== filter) return false
    if (!query) return true
    return normalize(`${transaction.description} ${getCategory(transaction.categoryId).label}`).includes(query)
  })

  const handleSave = (transaction: NewTransaction) => {
    addTransaction(transaction)
    setIsModalOpen(false)
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Histórico</h1>
          <p className="mt-2 text-slate-600">
            {transactions.length} {transactions.length === 1 ? 'movimentação registrada' : 'movimentações registradas'}.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-light px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
        >
          <MdAdd className="size-5" aria-hidden />
          Adicionar movimentação
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2" role="tablist" aria-label="Filtrar movimentações">
          {filters.map(({ id, label }) => {
            const isActive = id === filter

            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(id)}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 active:scale-95 ${
                  isActive ? 'bg-sidebar-active text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        <label className="relative w-full sm:w-80">
          <span className="sr-only">Buscar movimentação</span>
          <MdSearch
            className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por descrição ou categoria"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-3 pl-10 text-sm text-slate-900 transition-all duration-150 outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
        </label>
      </div>

      <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <TransactionsTable
          key={`${filter}-${query}`}
          transactions={visibleTransactions}
          emptyMessage={query ? 'Nenhuma movimentação encontrada para essa busca.' : 'Nenhuma movimentação por aqui.'}
        />
      </div>

      <NewTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </section>
  )
}

export default Historico

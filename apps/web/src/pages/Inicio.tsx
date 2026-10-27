import { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import BalanceCard from '../components/BalanceCard'
import ExpensesByCategoryChart from '../components/ExpensesByCategoryChart'
import IncomeExpenseChart from '../components/IncomeExpenseChart'
import MonthSelector from '../components/MonthSelector'
import NewTransactionModal from '../components/NewTransactionModal'
import RecentTransactions from '../components/RecentTransactions'
import SummaryCard from '../components/SummaryCard'
import type { NewTransaction } from '../data/transactions'
import { currentUser } from '../data/user'
import { useTransactions } from '../hooks/useTransactions'
import { getFirstName } from '../utils/format'

function getCurrentMonth() {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), 1)
}

function Inicio() {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth)
  const [isHidden, setIsHidden] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { summary, expensesByCategory, addTransaction } = useTransactions()

  const handleSave = (transaction: NewTransaction) => {
    addTransaction(transaction)
    setIsModalOpen(false)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_1fr]">
      <section className="flex w-full max-w-md flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Olá, {getFirstName(currentUser.name)}!</h1>
          <p className="mt-1.5 text-slate-500">Aqui está o resumo das suas finanças.</p>
        </div>

        <div>
          <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
        </div>

        <div key={selectedMonth.getTime()} className="flex animate-fade-in flex-col gap-4">
          <BalanceCard
            balance={summary.balance}
            balanceChange={summary.balanceChange}
            isHidden={isHidden}
            onToggleHidden={() => setIsHidden((hidden) => !hidden)}
          />

          <div className="grid grid-cols-2 gap-4">
            <SummaryCard type="income" amount={summary.income} isHidden={isHidden} />
            <SummaryCard type="expense" amount={summary.expense} isHidden={isHidden} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-brand to-brand-light px-6 py-4 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
        >
          <MdAdd className="size-6" aria-hidden />
          Adicionar movimentação
        </button>
      </section>

      <section className="flex min-w-0 flex-col gap-6 lg:pt-1">
        <IncomeExpenseChart endMonth={selectedMonth} />
        <ExpensesByCategoryChart totals={expensesByCategory} isHidden={isHidden} />
      </section>

      <div className="min-w-0 lg:col-span-2">
        <RecentTransactions isHidden={isHidden} />
      </div>

      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}

export default Inicio

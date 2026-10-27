import { type FormEvent, useState } from 'react'
import { categoriesByType } from '../data/categories'
import type { NewTransaction, TransactionType } from '../data/transactions'
import { getTodayISODate } from '../utils/format'
import CategoryPicker from './CategoryPicker'
import DatePicker from './DatePicker'
import Modal from './Modal'
import TransactionTypeToggle from './TransactionTypeToggle'

type NewTransactionModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: NewTransaction) => void
}

const centsFormatter = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const inputClassName =
  'w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-slate-900 transition-all duration-150 outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-brand focus:ring-4 focus:ring-brand/10'

function fieldBorder(hasError: boolean) {
  return hasError ? 'border-expense' : 'border-slate-200'
}

function FieldLabel({ label, error }: { label: string; error: string | null }) {
  return (
    <span className="flex items-baseline justify-between gap-3">
      <span className="text-sm font-semibold text-slate-900">{label}</span>
      {error && (
        <span role="alert" className="animate-fade text-xs font-medium text-expense">
          {error}
        </span>
      )}
    </span>
  )
}

function NewTransactionModal({ isOpen, onClose, onSave }: NewTransactionModalProps) {
  const [formKey, setFormKey] = useState(0)
  const [wasOpen, setWasOpen] = useState(isOpen)
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen)
    if (isOpen) setFormKey((key) => key + 1)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova movimentação">
      <TransactionForm key={formKey} onCancel={onClose} onSave={onSave} />
    </Modal>
  )
}

type TransactionFormProps = {
  onCancel: () => void
  onSave: (transaction: NewTransaction) => void
}

function TransactionForm({ onCancel, onSave }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('income')
  const [amountInCents, setAmountInCents] = useState(0)
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(getTodayISODate)
  const [wasSubmitted, setWasSubmitted] = useState(false)

  const errors = {
    amount: amountInCents <= 0 ? 'Informe um valor maior que zero.' : null,
    category: categoryId === null ? 'Selecione uma categoria.' : null,
  }
  const showError = (field: keyof typeof errors) => (wasSubmitted ? errors[field] : null)

  function handleTypeChange(newType: TransactionType) {
    if (newType === type) return
    setType(newType)
    setCategoryId(null)
  }

  function handleAmountChange(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    setAmountInCents(Number(digits))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setWasSubmitted(true)
    if (categoryId === null || Object.values(errors).some(Boolean)) return

    onSave({ type, amount: amountInCents / 100, categoryId, description: description.trim(), date })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 px-6 pt-3 pb-6">
      <TransactionTypeToggle value={type} onChange={handleTypeChange} />

      <label className="flex flex-col gap-2">
        <FieldLabel label="Valor" error={showError('amount')} />
        <span className="relative">
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[15px] text-slate-500">
            R$
          </span>
          <input
            data-autofocus
            type="text"
            inputMode="numeric"
            placeholder="0,00"
            value={amountInCents > 0 ? centsFormatter.format(amountInCents / 100) : ''}
            onChange={(event) => handleAmountChange(event.target.value)}
            aria-invalid={Boolean(showError('amount'))}
            className={`${inputClassName} ${fieldBorder(Boolean(showError('amount')))} pl-11 font-medium`}
          />
        </span>
      </label>

      <div className="flex flex-col gap-2">
        <FieldLabel label="Categoria" error={showError('category')} />
        <CategoryPicker
          key={type}
          label="Categoria"
          categories={categoriesByType[type]}
          value={categoryId}
          onChange={setCategoryId}
          hasError={Boolean(showError('category'))}
        />
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-slate-900">
          Descrição <span className="font-normal text-slate-400">(opcional)</span>
        </span>
        <input
          type="text"
          maxLength={60}
          placeholder={type === 'income' ? 'Ex: Salário, freelance, rendimentos...' : 'Ex: Almoço, mercado, aluguel...'}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={`${inputClassName} ${fieldBorder(false)}`}
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-slate-900">Data</span>
        <DatePicker label="Data" value={date} onChange={setDate} />
      </div>

      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-xl px-5 py-3.5 font-semibold text-slate-600 transition-all duration-150 hover:bg-slate-100 active:scale-[0.97]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 cursor-pointer rounded-xl bg-linear-to-r from-brand to-brand-light py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
        >
          Salvar movimentação
        </button>
      </div>
    </form>
  )
}

export default NewTransactionModal

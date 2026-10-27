const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'long' })
const dateFormatter = new Intl.DateTimeFormat('pt-BR')
const shortMonthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'short' })
const numberFormatter = new Intl.NumberFormat('pt-BR')
const percentFormatter = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 0 })

export function formatNumber(value: number) {
  return numberFormatter.format(value)
}

export function formatPercent(value: number) {
  return percentFormatter.format(value)
}

export function formatShortMonth(date: Date) {
  const month = shortMonthFormatter.format(date).replace('.', '')
  return `${month.charAt(0).toUpperCase()}${month.slice(1)}`
}

export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

export function formatMonthYear(date: Date) {
  const month = monthFormatter.format(date)
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${date.getFullYear()}`
}

export function toISODate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function parseISODate(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function getTodayISODate() {
  return toISODate(new Date())
}

export function formatDate(isoDate: string) {
  return dateFormatter.format(parseISODate(isoDate))
}

export function getCurrentTime() {
  const now = new Date()
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}

export function formatRelativeDay(isoDate: string) {
  const today = new Date()
  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
  if (isoDate === toISODate(today)) return 'Hoje'
  if (isoDate === toISODate(yesterday)) return 'Ontem'

  const date = parseISODate(isoDate)
  const dayMonth = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`
  return date.getFullYear() === today.getFullYear() ? dayMonth : formatDate(isoDate)
}

export function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? ''
}

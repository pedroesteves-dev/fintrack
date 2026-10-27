import type { IconType } from 'react-icons'
import { MdReceiptLong, MdSavings, MdTrendingUp } from 'react-icons/md'
import { TbTargetArrow } from 'react-icons/tb'

export type Notification = {
  id: number
  title: string
  description: string
  time: string
  icon: IconType
  isRead: boolean
}

export const initialNotifications: Notification[] = [
  {
    id: 1,
    title: 'Meta quase concluída',
    description: 'Você já guardou 80% da meta "Viagem de férias".',
    time: 'Há 5 min',
    icon: TbTargetArrow,
    isRead: false,
  },
  {
    id: 2,
    title: 'Fatura vence amanhã',
    description: 'A fatura do cartão de R$ 1.250,00 vence em 1 dia.',
    time: 'Há 2 h',
    icon: MdReceiptLong,
    isRead: false,
  },
  {
    id: 3,
    title: 'Gastos acima da média',
    description: 'Seus gastos com alimentação subiram 20% este mês.',
    time: 'Ontem',
    icon: MdTrendingUp,
    isRead: true,
  },
  {
    id: 4,
    title: 'Salário recebido',
    description: 'Uma receita de R$ 4.800,00 foi registrada na sua conta.',
    time: '3 dias atrás',
    icon: MdSavings,
    isRead: true,
  },
]

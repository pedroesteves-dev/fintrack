import { type ReactNode, useEffect, useRef, useState } from 'react'

type DropdownTriggerProps = {
  isOpen: boolean
  toggle: () => void
}

type DropdownProps = {
  trigger: (props: DropdownTriggerProps) => ReactNode
  children: (close: () => void) => ReactNode
  /** Classes extras do painel, como a largura (padrão: w-56). */
  panelClassName?: string
  role?: 'menu' | 'dialog'
  label?: string
}

function Dropdown({ trigger, children, panelClassName = 'w-56', role = 'menu', label }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const close = () => setIsOpen(false)

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      {trigger({ isOpen, toggle: () => setIsOpen((open) => !open) })}

      <div
        role={role}
        aria-label={label}
        className={`absolute top-full right-0 z-10 mt-2 origin-top-right rounded-xl border border-slate-200 bg-white shadow-lg transition-all duration-200 ease-out ${
          isOpen ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-1 scale-95 opacity-0'
        } ${panelClassName}`}
      >
        {children(close)}
      </div>
    </div>
  )
}

export default Dropdown

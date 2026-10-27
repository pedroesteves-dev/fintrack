import { type ReactNode, useEffect, useRef, useState } from 'react'

type DropdownTriggerProps = {
  isOpen: boolean
  toggle: () => void
}

type DropdownPlacement = 'bottom-end' | 'top-start'

type DropdownProps = {
  trigger: (props: DropdownTriggerProps) => ReactNode
  children: (close: () => void) => ReactNode
  panelClassName?: string
  role?: 'menu' | 'dialog'
  label?: string
  placement?: DropdownPlacement
}

const placementClassNames: Record<DropdownPlacement, { position: string; closed: string }> = {
  'bottom-end': { position: 'top-full right-0 mt-2 origin-top-right', closed: '-translate-y-1' },
  'top-start': { position: 'bottom-full left-0 mb-2 origin-bottom-left', closed: 'translate-y-1' },
}

function Dropdown({
  trigger,
  children,
  panelClassName = 'w-56',
  role = 'menu',
  label,
  placement = 'bottom-end',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const close = () => setIsOpen(false)
  const { position, closed } = placementClassNames[placement]

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      event.stopPropagation()
      setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      {trigger({ isOpen, toggle: () => setIsOpen((open) => !open) })}

      <div
        role={role}
        aria-label={label}
        className={`absolute z-10 rounded-xl border border-slate-200 bg-white shadow-lg transition-all duration-200 ease-out ${position} ${
          isOpen ? 'visible translate-y-0 scale-100 opacity-100' : `invisible scale-95 opacity-0 ${closed}`
        } ${panelClassName}`}
      >
        {children(close)}
      </div>
    </div>
  )
}

export default Dropdown

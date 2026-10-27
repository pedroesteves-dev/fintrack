import { type ReactNode, useEffect, useEffectEvent, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { MdClose } from 'react-icons/md'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  panelClassName?: string
}

function Modal({ isOpen, onClose, title, children, panelClassName = 'max-w-lg' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === 'Escape') onClose()
  })

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? '' : 'pointer-events-none'}`}
      inert={!isOpen}
    >
      <div
        className={`absolute inset-0 transition-all duration-300 ease-out ${
          isOpen ? 'bg-slate-900/40 backdrop-blur-[3px]' : 'bg-slate-900/0 backdrop-blur-[0px]'
        }`}
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative flex max-h-full w-full flex-col overflow-y-auto rounded-2xl bg-white shadow-xl transition-all duration-200 ease-out ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0'
        } ${panelClassName}`}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <h2 id={titleId} className="text-lg font-semibold text-slate-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex size-9 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-all duration-150 hover:bg-slate-100 hover:text-slate-900 active:scale-90"
          >
            <MdClose className="size-5" aria-hidden />
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal

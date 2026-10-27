import { type CSSProperties, useRef } from 'react'

const wrapperStyle: CSSProperties = {
  visibility: 'visible',
  zIndex: 10,
  transition: 'none',
}

export function useChartTooltipMotion() {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    const container = containerRef.current
    if (!container || container.dataset.tooltipSlide) return
    window.setTimeout(() => {
      container.dataset.tooltipSlide = 'true'
    }, 60)
  }

  return { containerRef, wrapperStyle, onMouseEnter: handleMouseEnter }
}

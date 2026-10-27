import type { Category } from '../data/categories'

type CategoryPickerProps = {
  categories: Category[]
  value: string | null
  onChange: (categoryId: string) => void
  hasError: boolean
  label: string
}

function CategoryPicker({ categories, value, onChange, hasError, label }: CategoryPickerProps) {
  return (
    <div className="grid animate-fade-in grid-cols-4 gap-2" role="radiogroup" aria-label={label} aria-invalid={hasError}>
      {categories.map(({ id, label: categoryLabel, icon: Icon, color }) => {
        const isSelected = id === value

        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(id)}
            className={`group flex cursor-pointer flex-col items-center gap-2 rounded-xl border px-1 py-3 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
              isSelected
                ? 'border-brand bg-avatar/30 shadow-sm'
                : `${hasError ? 'border-expense' : 'border-slate-200'} bg-white hover:border-slate-300 hover:shadow-sm`
            }`}
          >
            <span
              className={`flex size-10 items-center justify-center rounded-full transition-all duration-200 ${
                isSelected ? 'scale-110 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
              }`}
              style={isSelected ? { backgroundColor: color } : undefined}
            >
              <Icon className="size-5" aria-hidden />
            </span>
            <span className={`text-xs ${isSelected ? 'font-semibold text-slate-900' : 'font-medium text-slate-600'}`}>
              {categoryLabel}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default CategoryPicker

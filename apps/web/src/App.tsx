import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 p-4 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <h1 className="text-4xl font-bold tracking-tight">fintrack</h1>
      <p className="text-slate-600 dark:text-slate-400">
        Edite <code className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-sm dark:bg-slate-800">src/App.tsx</code> e salve para ver a mudança.
      </p>
      <button
        type="button"
        className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700"
        onClick={() => setCount((count) => count + 1)}
      >
        Contador: {count}
      </button>
    </main>
  )
}

export default App

import { Link } from 'react-router'

function NaoEncontrada() {
  return (
    <section>
      <h1 className="text-2xl font-bold">Página não encontrada</h1>
      <p className="mt-2 text-slate-600">O endereço acessado não existe.</p>
      <Link to="/" className="mt-4 inline-block font-medium text-sidebar-active hover:underline">
        Voltar para o início
      </Link>
    </section>
  )
}

export default NaoEncontrada

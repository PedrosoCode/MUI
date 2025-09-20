

function App() {

  return (
    <>
      <main className="bg-slate-100 min-h-screen">

    <section className="bg-slate-800 text-white py-20 px-6 md:px-16 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Computerized Maintenance Management System
        </h1>
        <p className="text-lg md:text-xl text-slate-300">
          Preditiva, Corretiva, Preventiva, e tudo mais que você precisar.
        </p>
      </div>
    </section>

    <section className="py-12 px-4 md:px-16">
      <div className="max-w-5xl mx-auto bg-slate-200 rounded-3xl shadow-md p-8 border border-gray-300">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Funcionalidades</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <li className="bg-white p-4 rounded-xl shadow-sm">📋 Ordens de Serviço</li>
          <li className="bg-white p-4 rounded-xl shadow-sm">🔍 Controle de Ativos</li>
          <li className="bg-white p-4 rounded-xl shadow-sm">📈 Relatórios de Manutenção</li>
          <li className="bg-white p-4 rounded-xl shadow-sm">⚙️ Tipos de Manutenção</li>
        </ul>
      </div>
    </section>
  </main>
    </>
  )
}

export default App

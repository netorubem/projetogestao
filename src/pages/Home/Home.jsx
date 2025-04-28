export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-700">
        Sistema de Gestão de Clientes
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
        Organize, gerencie e acompanhe seus clientes de forma simples e eficiente. 
        Acompanhe estatísticas no Dashboard, gerencie dados e tenha controle total em poucos cliques!
      </p>
      <div className="flex gap-6">
        <a
          href="/clientes"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded"
        >
          Ver Clientes
        </a>
        <a
          href="/dashboard"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded"
        >
          Acessar Dashboard
        </a>
      </div>
    </section>
  );
}

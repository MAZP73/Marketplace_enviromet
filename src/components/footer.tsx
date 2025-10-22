export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-white py-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">MarketMaas</h2>
          <p className="text-sm text-emerald-200">
            Conectando empresas y organizaciones para reducir el desperdicio de alimentos.
          </p>
        </div>
      </div>
      <div className="border-t border-emerald-800 mt-4 pt-3 text-center text-sm text-emerald-200">
        © {new Date().getFullYear()} MarketMaas. Todos los derechos reservados.
      </div>
    </footer>
  );
}

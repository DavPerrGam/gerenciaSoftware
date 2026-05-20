import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hospital, Search, Phone, Mail } from 'lucide-react';

import { authService } from '../services/auth.service.js';

interface HeaderProps {
  isAdmin?: boolean;
}

export function Header({ isAdmin = false }: HeaderProps) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 shadow-lg shadow-blue-900/10">
      {/* Top Bar - Contact & Language */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Phone size={14} />
              <span>+57 8 2345678</span>
            </div>
            <div className="h-4 w-px bg-blue-400"></div>
            <div className="flex items-center gap-1.5">
              <Mail size={14} />
              <span>info@sanrafael.gov.co</span>
            </div>
          </div>
          <select className="rounded-lg border border-blue-400 bg-blue-800/50 px-2 py-0.5 text-xs text-white outline-none">
            <option>Español</option>
            <option>English</option>
          </select>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-gradient-to-r from-white via-blue-50/30 to-white border-b border-blue-100 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-600/40">
                <Hospital size={32} />
              </div>
              <div>
                <p className="text-lg font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent">Hospital San Rafael</p>
                <p className="text-xs uppercase tracking-[0.3em] text-blue-600 font-semibold">Monitoreo Avanzado</p>
              </div>
              {/* Logo placeholder - USTA */}
              <div className="hidden lg:flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300 shadow-md ml-4">
                <span className="text-xs text-center text-amber-800 font-bold px-1">USTA</span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl lg:mx-8">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar servicios, alertas..."
                className="w-full rounded-full border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 py-3 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300/30 shadow-sm"
              />
            </div>

            {/* Auth Section */}
            <div className="flex items-center justify-end gap-3">
              {!isAdmin ? (
                <Link
                  to="/login"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/40 hover:shadow-blue-600/60 transition-all hover:-translate-y-0.5"
                >
                  Ingresar
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-gradient-to-r from-red-600 to-red-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/40 hover:shadow-red-600/60 transition-all hover:-translate-y-0.5"
                >
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-2 text-sm">
            <Link to="/" className="rounded-full px-4 py-2 font-medium text-blue-900 transition hover:bg-white hover:text-blue-600 hover:shadow-md">
              Inicio
            </Link>
            <Link to="/admin" className="rounded-full px-4 py-2 font-medium text-blue-700 transition hover:bg-white hover:text-blue-600 hover:shadow-md">
              Panel Admin
            </Link>
            <a href="#servicios" className="rounded-full px-4 py-2 font-medium text-blue-700 transition hover:bg-white hover:text-blue-600 hover:shadow-md">
              Servicios
            </a>
            <a href="#estado" className="rounded-full px-4 py-2 font-medium text-blue-700 transition hover:bg-white hover:text-blue-600 hover:shadow-md">
              Estado General
            </a>
            <a href="#contacto" className="rounded-full px-4 py-2 font-medium text-blue-700 transition hover:bg-white hover:text-blue-600 hover:shadow-md">
              Contacto
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

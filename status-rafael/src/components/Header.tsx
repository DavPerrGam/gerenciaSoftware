import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Hospital, Search, Phone, Mail, Shield } from 'lucide-react';

import { authService } from '../services/auth.service.js';
import { statusService } from '../services/status.service.js';
import { EventCondition } from '../types/index.js';
import { Button } from './ui/Button';

interface HeaderProps {
  isAdmin?: boolean;
}

export function Header({ isAdmin = false }: HeaderProps) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const globalStatus = statusService.getGlobalStatus();
  const isHealthy = globalStatus === EventCondition.CONDITION_ACTIVE;

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const navLinkClass = (path: string, isHash = false) => {
    const active = !isHash && location.pathname === path;
    return `rounded-full px-4 py-2 font-medium transition focus-ring ${
      active
        ? 'bg-white text-brand shadow-md'
        : 'text-brand/90 hover:bg-white/80 hover:text-brand hover:shadow-sm'
    }`;
  };

  return (
    <header className="sticky top-0 z-30 shadow-lg shadow-brand/10">
      <div className="bg-gradient-to-r from-brand-dark via-brand to-brand-dark text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-xs font-medium sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Phone size={13} />
              <span>+57 8 2345678</span>
            </div>
            <div className="hidden h-4 w-px bg-white/30 sm:block" />
            <div className="hidden items-center gap-1.5 sm:flex">
              <Mail size={13} />
              <span>info@sanrafael.gov.co</span>
            </div>
          </div>
          <select
            className="rounded-lg border border-white/30 bg-white/10 px-2 py-0.5 text-xs outline-none"
            aria-label="Idioma"
            defaultValue="es"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="glass-panel border-b border-brand/10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Link to="/" className="group flex items-center gap-4 focus-ring rounded-2xl">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-lg shadow-brand/30">
                  <Hospital size={28} />
                </div>
                {isHealthy && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-active opacity-60" />
                    <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-status-active" />
                  </span>
                )}
              </div>
              <div>
                <p className="font-display text-lg font-bold text-gradient-brand">Hospital San Rafael</p>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand/70">
                  Monitoreo operativo
                </p>
              </div>
              <div className="ml-2 hidden rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 px-3 py-2 lg:block">
                <span className="text-xs font-bold text-amber-800">USTA</span>
              </div>
            </Link>

            <div className="relative max-w-xl flex-1 lg:mx-6">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-brand/50"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar servicios, alertas..."
                className="input-field rounded-full py-2.5 pl-11 pr-4 text-sm"
                aria-label="Buscar servicios"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              {!isAdmin ? (
                <Link to="/login">
                  <Button variant="primary" className="!py-2.5 !text-sm">
                    Ingresar
                  </Button>
                </Link>
              ) : (
                <Button variant="danger" onClick={handleLogout} className="!py-2.5 !text-sm">
                  Cerrar sesión
                </Button>
              )}
            </div>
          </div>
        </div>

        <nav className="border-t border-brand/10 bg-gradient-to-r from-brand-soft/50 to-accent-soft/30">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 text-sm sm:px-6 lg:px-8">
            <Link to="/" className={navLinkClass('/')}>
              Inicio
            </Link>
            <a href="#servicios" className={navLinkClass('', true)}>
              Servicios
            </a>
            <a href="#estado" className={navLinkClass('', true)}>
              Estado General
            </a>
            <a href="#informacion" className={navLinkClass('', true)}>
              Información
            </a>
            <a href="#contacto" className={navLinkClass('', true)}>
              Contacto
            </a>
            <Link
              to="/admin"
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white/60 px-4 py-2 font-medium text-brand transition hover:bg-white hover:shadow-sm focus-ring"
            >
              <Shield size={14} />
              Panel Admin
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

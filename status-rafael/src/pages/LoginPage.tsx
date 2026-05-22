import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import { Lock, Server, Activity, Database, ChevronDown } from 'lucide-react';

import { PageLayout } from '../components/PageLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { authService } from '../services/auth.service.js';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (authService.login(email, password)) {
      navigate('/admin');
    } else {
      setError('Email o contraseña incorrectos');
      setIsLoading(false);
    }
  };

  return (
    <PageLayout showFooter={false} mainClassName="!max-w-none !px-0 !py-0 flex items-center justify-center min-h-[calc(100vh-180px)]">
      <div className="mx-auto grid w-full max-w-5xl gap-0 overflow-hidden rounded-3xl border border-brand/15 bg-white shadow-brand-lg md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-brand-dark via-brand to-accent p-10 text-white md:flex">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">
              Hospital San Rafael
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight">
              Monitoreo de sistemas críticos
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-blue-100">
              Acceso restringido al panel administrativo para supervisión de disponibilidad y
              eventos operativos.
            </p>
          </div>
          <div className="mt-10 space-y-4">
            {[
              { icon: Server, label: 'Infraestructura TI' },
              { icon: Activity, label: 'Disponibilidad en vivo' },
              { icon: Database, label: 'Historial de incidentes' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                <Icon size={20} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="rounded-none border-0 p-10 shadow-none">
          <div className="mb-8 text-center">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-lg shadow-brand/30">
              <Lock size={28} />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold text-gradient-brand">
              Acceso administrativo
            </h2>
            <p className="mt-2 text-sm text-muted">
              Ingresa para revisar el estado de servicios y eventos hospitalarios.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-status-error/30 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-brand" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="input-field"
                placeholder="admin@sanrafael.gov.co"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-brand" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="input-field"
                required
              />
            </div>

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
            </Button>
          </form>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => setShowCredentials(!showCredentials)}
              className="flex w-full items-center justify-between rounded-2xl border border-brand/15 bg-brand-soft/50 px-4 py-3 text-sm font-semibold text-brand focus-ring"
            >
              Credenciales de demostración
              <ChevronDown
                size={18}
                className={`transition ${showCredentials ? 'rotate-180' : ''}`}
              />
            </button>
            {showCredentials && (
              <div className="mt-3 space-y-2 rounded-2xl border border-brand/10 bg-slate-50 p-4 text-xs font-mono text-slate-600">
                <p>usuario: admin@sanrafael.gov.co</p>
                <p>clave: SanRafael2026*</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}

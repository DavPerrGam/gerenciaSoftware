import { useMemo } from 'react';

import { Header } from '../components/Header';
import { storageService } from '../services/storage.service.js';
import { statusService } from '../services/status.service.js';
import { EventCondition } from '../types/index.js';

interface StatCardProps {
  title: string;
  value: number;
  accent: string;
}

function StatCard({ title, value, accent }: StatCardProps) {
  return (
    <div className="surface-card p-6 border-l-4 border-brand/20 bg-white shadow-sm">
      <p className="text-sm uppercase tracking-[0.32em] text-slate-500">{title}</p>
      <p className={`mt-5 text-4xl font-semibold text-slate-950 ${accent}`}>{value}</p>
    </div>
  );
}

export function AdminDashboardPage() {
  const products = useMemo(() => storageService.getProducts(), []);

  const totalProducts = products.length;
  const activeCount = products.filter(
    (p) => statusService.getCurrentProductStatus(p.id) === EventCondition.CONDITION_ACTIVE
  ).length;
  const warningCount = products.filter(
    (p) => statusService.getCurrentProductStatus(p.id) === EventCondition.CONDITION_WARNING
  ).length;
  const errorCount = products.filter(
    (p) => statusService.getCurrentProductStatus(p.id) === EventCondition.CONDITION_ERROR
  ).length;
  const uptime = useMemo(() => statusService.getUptime(), []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header isAdmin />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand mb-2">Panel administrativo</p>
            <h1 className="text-4xl font-semibold text-slate-950">Monitoreo completo de servicios</h1>
            <p className="mt-3 text-sm text-muted max-w-2xl">Visualiza el estado operativo, alertas y disponibilidad de la red de servicios hospitalarios con precisión y claridad.</p>
          </div>
          <div className="rounded-3xl bg-brand-soft px-5 py-4 text-brand shadow-brand">
            <p className="text-sm uppercase tracking-[0.25em]">Uptime general</p>
            <p className="mt-2 text-3xl font-semibold">{uptime}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <StatCard title="Total servicios" value={totalProducts} accent="text-brand" />
          <StatCard title="Operativos" value={activeCount} accent="text-emerald-700" />
          <StatCard title="Advertencias" value={warningCount} accent="text-amber-600" />
          <StatCard title="Errores" value={errorCount} accent="text-rose-600" />
        </div>

        <div className="surface-card p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950 mb-2">Disponibilidad del sistema</h2>
              <p className="text-sm text-muted">Porcentaje de uptime calculado en base a los servicios monitorizados, con foco en continuidad operacional.</p>
            </div>
            <p className="rounded-3xl bg-slate-100 px-5 py-3 text-xl font-semibold text-slate-950 shadow-sm">{uptime}%</p>
          </div>

          <div className="mt-6 w-full rounded-3xl bg-slate-200 overflow-hidden h-4">
            <div className="h-4 rounded-3xl bg-brand transition-all duration-500" style={{ width: `${uptime}%` }} />
          </div>
        </div>
      </main>
    </div>
  );
}

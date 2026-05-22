import { useMemo } from 'react';
import {
  Server,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Shield,
} from 'lucide-react';

import { PageLayout } from '../components/PageLayout';
import { MetricCard } from '../components/ui/MetricCard';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/StatusBadge';
import { storageService } from '../services/storage.service.js';
import { statusService } from '../services/status.service.js';
import { EventCondition } from '../types/index.js';

export function AdminDashboardPage() {
  const products = useMemo(() => storageService.getProducts(), []);

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
  const total = products.length || 1;

  const previewServices = products.slice(0, 8);

  return (
    <PageLayout isAdmin showFooter={false}>
      <div className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-brand-dark via-brand to-accent p-8 text-white shadow-brand-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Shield size={14} />
              Sesión administrativa
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Monitoreo completo de servicios
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-blue-100">
              Visualiza el estado operativo, alertas y disponibilidad de la red de servicios
              hospitalarios.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-center backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
              Uptime general
            </p>
            <p className="mt-1 font-display text-4xl font-bold">{uptime}%</p>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total servicios"
          value={products.length}
          icon={Server}
          accentClass="text-brand"
          iconBgClass="bg-brand-soft text-brand"
        />
        <MetricCard
          label="Operativos"
          value={activeCount}
          icon={CheckCircle2}
          accentClass="text-status-active"
          iconBgClass="bg-emerald-50 text-status-active"
          delayClass="animate-delay-100"
        />
        <MetricCard
          label="Advertencias"
          value={warningCount}
          icon={AlertTriangle}
          accentClass="text-status-warning"
          iconBgClass="bg-amber-50 text-status-warning"
          delayClass="animate-delay-200"
        />
        <MetricCard
          label="Errores"
          value={errorCount}
          icon={XCircle}
          accentClass="text-status-error"
          iconBgClass="bg-red-50 text-status-error"
          delayClass="animate-delay-300"
        />
      </div>

      <Card className="mb-8 p-8">
        <h2 className="font-display text-xl font-bold text-slate-950">Disponibilidad del sistema</h2>
        <p className="mt-2 text-sm text-muted">
          Distribución visual por estado de los servicios monitorizados.
        </p>

        <div className="mt-6 flex h-4 overflow-hidden rounded-full bg-slate-200">
          <div
            className="bg-status-active transition-all duration-500"
            style={{ width: `${(activeCount / total) * 100}%` }}
            title="Operativos"
          />
          <div
            className="bg-status-warning transition-all duration-500"
            style={{ width: `${(warningCount / total) * 100}%` }}
            title="Advertencias"
          />
          <div
            className="bg-status-error transition-all duration-500"
            style={{ width: `${(errorCount / total) * 100}%` }}
            title="Errores"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold">
          <span className="flex items-center gap-2 text-status-active">
            <span className="h-2 w-2 rounded-full bg-status-active" />
            Operativos ({activeCount})
          </span>
          <span className="flex items-center gap-2 text-status-warning">
            <span className="h-2 w-2 rounded-full bg-status-warning" />
            Alertas ({warningCount})
          </span>
          <span className="flex items-center gap-2 text-status-error">
            <span className="h-2 w-2 rounded-full bg-status-error" />
            Críticos ({errorCount})
          </span>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-all duration-700"
            style={{ width: `${uptime}%` }}
          />
        </div>
        <p className="mt-2 text-right text-sm font-bold text-brand">{uptime}% uptime</p>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-slate-200 bg-brand-soft/40 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-slate-950">Vista de servicios</h2>
          <p className="text-sm text-muted">Resumen visual del estado por servicio</p>
        </div>
        <div className="divide-y divide-slate-100">
          {previewServices.map((product) => {
            const status = statusService.getCurrentProductStatus(product.id);
            return (
              <div
                key={product.id}
                className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50/80 transition"
              >
                <div>
                  <p className="font-semibold text-slate-900">{product.name}</p>
                  <p className="text-sm text-muted">{product.type}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-slate-200 sm:block">
                    <div
                      className={`h-full rounded-full ${
                        status === EventCondition.CONDITION_ACTIVE
                          ? 'bg-status-active w-full'
                          : status === EventCondition.CONDITION_WARNING
                            ? 'bg-status-warning w-2/3'
                            : 'bg-status-error w-1/3'
                      }`}
                    />
                  </div>
                  <StatusBadge condition={status} size="sm" variant="outline" />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </PageLayout>
  );
}

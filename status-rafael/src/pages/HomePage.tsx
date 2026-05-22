import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Phone, Shield, Clock } from 'lucide-react';

import { PageLayout } from '../components/PageLayout';
import { GlobalStatus } from '../components/GlobalStatus';
import { ProductCard } from '../components/ProductCard';
import { MetricCard } from '../components/ui/MetricCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { storageService } from '../services/storage.service.js';
import { statusService } from '../services/status.service.js';
import { EventCondition } from '../types/index.js';

const dashboardMetrics = [
  {
    label: 'Servicios activos',
    key: EventCondition.CONDITION_ACTIVE,
    accentClass: 'text-status-active',
    iconBgClass: 'bg-emerald-50 text-status-active',
    icon: CheckCircle2,
    delayClass: 'animate-delay-100',
  },
  {
    label: 'Alertas recientes',
    key: EventCondition.CONDITION_WARNING,
    accentClass: 'text-status-warning',
    iconBgClass: 'bg-amber-50 text-status-warning',
    icon: AlertTriangle,
    delayClass: 'animate-delay-200',
  },
  {
    label: 'Incidencias críticas',
    key: EventCondition.CONDITION_ERROR,
    accentClass: 'text-status-error',
    iconBgClass: 'bg-red-50 text-status-error',
    icon: XCircle,
    delayClass: 'animate-delay-300',
  },
];

const filterTabs = [
  { id: 'all', label: 'Todos' },
  { id: 'active', label: 'Operativos' },
  { id: 'warning', label: 'Alertas' },
  { id: 'error', label: 'Críticos' },
] as const;

export function HomePage() {
  const [activeTab, setActiveTab] = useState<(typeof filterTabs)[number]['id']>('all');
  const products = useMemo(() => storageService.getProducts(), []);
  const lastUpdate = useMemo(() => new Date(), []);

  const metrics = useMemo(
    () =>
      dashboardMetrics.map((metric) => ({
        ...metric,
        value: products.filter(
          (product) => statusService.getCurrentProductStatus(product.id) === metric.key
        ).length,
      })),
    [products]
  );

  return (
    <PageLayout>
      <section className="hero-pattern relative mb-12 overflow-hidden rounded-3xl border border-brand/10 bg-gradient-to-br from-white via-brand-soft/30 to-accent-soft/20 p-8 sm:p-12">
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-status-active/30 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-status-active animate-pulse-soft" />
              Estado operativo en tiempo real
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-gradient-brand sm:text-5xl">
              Estado operativo del Hospital San Rafael
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Centro de control institucional para la disponibilidad de sistemas tecnológicos
              críticos: métricas accionables, alertas jerarquizadas y acceso inmediato a cada
              servicio.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  icon={metric.icon}
                  accentClass={metric.accentClass}
                  iconBgClass={metric.iconBgClass}
                  delayClass={metric.delayClass}
                />
              ))}
            </div>
          </div>

          <div className="opacity-0 animate-slide-up animate-delay-200" style={{ animationFillMode: 'forwards' }}>
            <GlobalStatus />
          </div>
        </div>
      </section>

      <section id="servicios">
        <SectionHeader
          title="Servicios monitorizados"
          subtitle="Accede a cada unidad y observa su condición en tiempo real."
          badge={
            <div className="rounded-2xl border border-brand/15 bg-brand-soft px-4 py-2 text-sm font-semibold text-brand shadow-sm">
              Actualizado: {lastUpdate.toLocaleTimeString('es-CO')}
            </div>
          }
        />

        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filtros visuales de servicios">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-ring ${
                activeTab === tab.id
                  ? 'bg-brand text-white shadow-md shadow-brand/25'
                  : 'border border-brand/20 bg-white/80 text-brand hover:bg-brand-soft'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {products.length === 0 ? (
          <Card className="p-10 text-center text-muted">No hay servicios registrados aún.</Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-16" id="informacion">
        <SectionHeader
          title="Información clave"
          subtitle="Dónde consultar disponibilidad, alertas y canales de atención."
        />
        <div className="grid gap-6 md:grid-cols-3">
          <Card accent="brand" className="p-8">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <Phone size={22} />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Canales de atención</p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Línea administrativa, correo institucional y atención prioritaria para emergencias
              operativas.
            </p>
          </Card>
          <Card accent="accent" className="p-8">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Shield size={22} />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Acceso seguro</p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Solo personal autorizado accede al panel administrativo y reportes detallados.
            </p>
          </Card>
          <Card accent="success" className="p-8">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-status-active">
              <Clock size={22} />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-status-active">
              Política de servicio
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Monitoreo continuo y escalación automática de incidentes críticos.
            </p>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
}

import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Layers, User, AlertCircle, Calendar } from 'lucide-react';

import { PageLayout } from '../components/PageLayout';
import type { Product, Event } from '../types/index.js';
import { storageService } from '../services/storage.service.js';
import { statusService } from '../services/status.service.js';
import { IncidentTimeline } from '../components/IncidentTimeline';
import { StatusBadge } from '../components/StatusBadge';
import { GlobalStatus } from '../components/GlobalStatus';
import { MetricCard } from '../components/ui/MetricCard';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  const product = useMemo<Product | null>(() => {
    if (!id) return null;
    return storageService.getProducts().find((p) => p.id === id) ?? null;
  }, [id]);

  const events = useMemo<Event[]>(() => {
    if (!id) return [];
    return storageService.getEventsByProduct(id);
  }, [id]);

  if (!product) {
    return (
      <PageLayout>
        <Card className="p-12 text-center">
          <p className="text-lg font-semibold text-slate-800">Servicio no encontrado</p>
          <Link to="/" className="mt-4 inline-block text-brand font-medium hover:underline">
            Volver al inicio
          </Link>
        </Card>
      </PageLayout>
    );
  }

  const currentStatus = statusService.getCurrentProductStatus(product.id);
  const incidentCount = events.length;

  return (
    <PageLayout>
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
        <Link to="/" className="font-medium text-brand hover:underline">
          Inicio
        </Link>
        <span>/</span>
        <span className="text-slate-600">{product.name}</span>
      </nav>

      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 font-medium text-brand transition hover:text-brand-dark focus-ring rounded-lg"
      >
        <ChevronLeft size={20} />
        Volver al inicio
      </Link>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <Card className="p-8">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand/70">
                Detalle del servicio
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-slate-950">{product.name}</h1>
              <p className="mt-3 text-muted leading-relaxed">{product.description}</p>
            </div>
            <StatusBadge condition={currentStatus} size="lg" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <MetricCard
              label="Tipo de servicio"
              value={product.type}
              icon={Layers}
              accentClass="text-brand"
              iconBgClass="bg-brand-soft text-brand"
            />
            <MetricCard
              label="Responsable"
              value={product.owner}
              icon={User}
              accentClass="text-brand"
              iconBgClass="bg-brand-soft text-brand"
            />
            <MetricCard
              label="Incidentes totales"
              value={incidentCount}
              icon={AlertCircle}
              accentClass="text-status-warning"
              iconBgClass="bg-amber-50 text-status-warning"
            />
            <MetricCard
              label="Última actualización"
              value={new Date().toLocaleDateString('es-CO')}
              icon={Calendar}
              accentClass="text-brand"
              iconBgClass="bg-brand-soft text-brand"
            />
          </div>
        </Card>

        <div className="space-y-6">
          <GlobalStatus />
          <Card className="p-6">
            <h2 className="font-display text-lg font-bold text-slate-950">Visión rápida</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Este servicio mantiene la operación continua de componentes críticos del hospital.
              Uptime institucional: {statusService.getUptime()}%.
            </p>
          </Card>
        </div>
      </div>

      <section className="mt-10">
        <SectionHeader title="Historial de incidentes" />
        <Card className="p-8">
          <IncidentTimeline events={events} />
        </Card>
      </section>
    </PageLayout>
  );
}

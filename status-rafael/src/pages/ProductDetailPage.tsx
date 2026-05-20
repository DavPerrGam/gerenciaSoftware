import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import { Header } from '../components/Header';
import type { Product, Event } from '../types/index.js';
import { storageService } from '../services/storage.service.js';
import { statusService } from '../services/status.service.js';
import { IncidentTimeline } from '../components/IncidentTimeline';
import { StatusBadge } from '../components/StatusBadge';

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
      <div className="min-h-screen bg-slate-50">
        <Header />
        <p className="text-center text-muted p-10">Servicio no encontrado</p>
      </div>
    );
  }

  const currentStatus = statusService.getCurrentProductStatus(product.id);
  const incidentCount = events.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-brand font-medium mb-6 hover:text-brand/80 transition">
          <ChevronLeft size={20} />
          Volver al inicio
        </Link>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
          <div className="surface-card p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-slate-950 mb-2">{product.name}</h1>
                <p className="text-muted">{product.description}</p>
              </div>
              <StatusBadge condition={currentStatus} size="lg" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-muted">Tipo de servicio</p>
                <p className="mt-2 font-semibold text-slate-950">{product.type}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-muted">Responsable</p>
                <p className="mt-2 font-semibold text-slate-950">{product.owner}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-muted">Incidentes totales</p>
                <p className="mt-2 font-semibold text-slate-950">{incidentCount}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-muted">Última actualización</p>
                <p className="mt-2 font-semibold text-slate-950">{new Date().toLocaleDateString('es-CO')}</p>
              </div>
            </div>
          </div>

          <div className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950 mb-4">Visión rápida</h2>
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-muted">Disponibilidad general</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">{statusService.getUptime()}%</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-muted">Estado actual</p>
                <p className="mt-2 text-xl font-semibold text-slate-950"><StatusBadge condition={currentStatus} size="md" /></p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-muted">Descripción breve</p>
                <p className="mt-2 text-slate-600 leading-7">Este servicio es responsable de mantener la operación continua de componentes críticos del hospital.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-slate-950 mb-6">Historial de incidentes</h2>
          <div className="surface-card p-8">
            <IncidentTimeline events={events} />
          </div>
        </div>
      </main>
    </div>
  );
}

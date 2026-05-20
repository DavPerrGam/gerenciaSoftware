import { useMemo } from "react";

import { Header } from "../components/Header";
import { GlobalStatus } from "../components/GlobalStatus";
import { ProductCard } from "../components/ProductCard";
import { storageService } from "../services/storage.service.js";
import { statusService } from "../services/status.service.js";
import { EventCondition } from "../types/index.js";

const dashboardMetrics = [
  {
    label: "Servicios activos",
    key: EventCondition.CONDITION_ACTIVE,
    accent: "text-emerald-700",
  },
  {
    label: "Alertas recientes",
    key: EventCondition.CONDITION_WARNING,
    accent: "text-amber-600",
  },
  {
    label: "Incidencias críticas",
    key: EventCondition.CONDITION_ERROR,
    accent: "text-rose-600",
  },
];

export function HomePage() {
  const products = useMemo(() => storageService.getProducts(), []);
  const lastUpdate = useMemo(() => new Date(), []);

  const metrics = useMemo(
    () =>
      dashboardMetrics.map((metric) => ({
        ...metric,
        value: products.filter((product) => statusService.getCurrentProductStatus(product.id) === metric.key).length,
      })),
    [products]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="grid gap-8 lg:grid-cols-[1.6fr_1fr] items-start mb-12">
          <div className="surface-card p-10 border-l-4 border-blue-600">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse" />
              Estado operativo en tiempo real
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent leading-tight">Monitorea la disponibilidad hospitalaria con precisión.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-700">Un centro de control diseñado para Hospital San Rafael, con métricas accionables, alertas jerarquizadas y acceso inmediato a cada servicio crítico.</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-md hover:shadow-lg hover:border-cyan-400 transition-all">
                  <p className="text-sm uppercase tracking-[0.25em] font-semibold text-blue-600">{metric.label}</p>
                  <p className={`mt-4 text-3xl font-bold ${metric.accent}`}>{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="surface-card p-8 border-l-4 border-cyan-500 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-600 font-bold mb-4">Icono de medicina</p>
              <div className="rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 border-2 border-green-300 flex items-center justify-center">
                <span className="text-5xl">⚕️</span>
              </div>
              <p className="mt-4 text-xs text-gray-600">Representación de servicios médicos</p>
            </div>

            <div className="surface-card-strong p-8 border-l-4 border-blue-600">
              <p className="text-sm uppercase tracking-[0.35em] text-blue-600 font-bold mb-3">Estado general</p>
              <p className="text-xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">Sistema Operativo</p>
              <p className="mt-3 text-sm text-gray-600">Todos los servicios funcionan dentro de parámetros normales</p>
              <div className="mt-5 rounded-full h-2 bg-gray-200 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{width: "95%"}}></div>
              </div>
              <p className="mt-2 text-xs font-semibold text-green-700">Disponibilidad: 95%</p>
            </div>
          </div>
        </section>

        <section className="mt-12" id="servicios">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-cyan-600 bg-clip-text text-transparent">Servicios monitorizados</h2>
              <p className="text-sm text-blue-600 font-medium mt-2">Accede a cada unidad y observa su condición en tiempo real.</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 text-sm font-semibold text-blue-800 shadow-md">
              ⏱ {lastUpdate.toLocaleTimeString("es-CO")}
            </div>
          </div>

          {products.length === 0 ? (
            <div className="surface-card p-8 text-center text-gray-600">
              <p>No hay servicios registrados aún.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-16" id="informacion">
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-cyan-600 bg-clip-text text-transparent">Información clave</h2>
            <p className="text-sm text-blue-600 font-medium mt-2">Dónde consultar disponibilidad, alertas y canales de atención.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="surface-card p-8 border-l-4 border-blue-600">
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-blue-600">Canales de atención</p>
              <p className="mt-4 text-base font-medium text-gray-700">Línea administrativa, correo institucional y atención prioritaria para emergencias operativas.</p>
            </div>
            <div className="surface-card p-8 border-l-4 border-cyan-500">
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-cyan-600">Acceso seguro</p>
              <p className="mt-4 text-base font-medium text-gray-700">Solo personal autorizado accede al panel administrativo y reportes detallados.</p>
            </div>
            <div className="surface-card p-8 border-l-4 border-green-500">
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-green-600">Política de servicio</p>
              <p className="mt-4 text-base font-medium text-gray-700">Monitoreo continuo y escalación automática de incidentes críticos.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 py-10 bg-gradient-to-r from-blue-900 to-blue-800 text-white" id="contacto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3 mb-8">
            <div>
              <h3 className="font-bold mb-3">Ubicación</h3>
              <p className="text-sm text-blue-100">Calle 6 # 11-50, Tunja, Boyacá</p>
            </div>
            <div>
              <h3 className="font-bold mb-3">Contacto</h3>
              <p className="text-sm text-blue-100">Tel: +57 8 2345678</p>
              <p className="text-sm text-blue-100">Email: info@sanrafael.gov.co</p>
            </div>
            <div>
              <h3 className="font-bold mb-3">Horarios</h3>
              <p className="text-sm text-blue-100">Lunes - Viernes: 8:00 - 18:00</p>
              <p className="text-sm text-blue-100">Emergencias: 24/7</p>
            </div>
          </div>
          <div className="border-t border-blue-700 pt-8 text-center text-sm text-blue-100">
            <p>© 2026 Hospital Universitario San Rafael de Tunja. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

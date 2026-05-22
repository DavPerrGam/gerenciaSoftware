import { Activity, AlertTriangle, AlertCircle } from 'lucide-react';

import { EventCondition } from '../types/index.js';
import { statusService } from '../services/status.service.js';
import { StatusBadge } from './StatusBadge';

const statusConfig = {
  [EventCondition.CONDITION_ACTIVE]: {
    icon: Activity,
    label: 'Operativo',
    description: 'Todas las unidades se encuentran dentro de los límites normales.',
    ringColor: '#06a77d',
    bgGradient: 'from-emerald-50/80 to-white',
    borderAccent: 'border-l-status-active',
  },
  [EventCondition.CONDITION_WARNING]: {
    icon: AlertTriangle,
    label: 'Advertencia',
    description: 'Hay alertas leves que requieren seguimiento puntual.',
    ringColor: '#ff9f43',
    bgGradient: 'from-amber-50/80 to-white',
    borderAccent: 'border-l-status-warning',
  },
  [EventCondition.CONDITION_ERROR]: {
    icon: AlertCircle,
    label: 'Incidencia crítica',
    description: 'Se detectaron problemas importantes en servicios clave.',
    ringColor: '#ee5a52',
    bgGradient: 'from-red-50/80 to-white',
    borderAccent: 'border-l-status-error',
  },
};

function UptimeRing({ uptime, color }: { uptime: number; color: string }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (uptime / 100) * circumference;

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg className="-rotate-90" width="128" height="128" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-bold text-slate-900">{uptime}%</span>
        <span className="text-xs font-medium text-muted">uptime</span>
      </div>
    </div>
  );
}

export function GlobalStatus() {
  const globalStatus = statusService.getGlobalStatus();
  const uptime = statusService.getUptime();
  const config = statusConfig[globalStatus];
  const Icon = config.icon;

  return (
    <div
      id="estado"
      className={`surface-card-strong border-l-4 bg-gradient-to-br p-8 ${config.borderAccent} ${config.bgGradient}`}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-brand">Estado general</p>
          <h2 className="font-display text-3xl font-bold text-slate-950">
            Disponibilidad del hospital
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            {config.description} El panel centraliza la información crítica para decisión rápida.
          </p>
          <div className="mt-5">
            <StatusBadge condition={globalStatus} size="lg" />
          </div>
        </div>

        <div className="flex items-center gap-6 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm">
          <UptimeRing uptime={uptime} color={config.ringColor} />
          <div className="hidden sm:block">
            <div
              className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
                globalStatus === EventCondition.CONDITION_ACTIVE
                  ? 'bg-emerald-50 text-status-active'
                  : globalStatus === EventCondition.CONDITION_WARNING
                    ? 'bg-amber-50 text-status-warning'
                    : 'bg-red-50 text-status-error'
              }`}
            >
              <Icon size={28} />
            </div>
            <p className="font-display text-xl font-bold text-slate-950">{config.label}</p>
            <p className="mt-1 text-sm text-muted">Estado consolidado</p>
          </div>
        </div>
      </div>
    </div>
  );
}

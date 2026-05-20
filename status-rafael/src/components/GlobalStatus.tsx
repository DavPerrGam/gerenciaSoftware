import { Activity, AlertTriangle, AlertCircle } from 'lucide-react';

import { EventCondition } from '../types/index.js';
import { statusService } from '../services/status.service.js';
import { StatusBadge } from './StatusBadge';

const statusConfig = {
  [EventCondition.CONDITION_ACTIVE]: {
    icon: Activity,
    label: 'Operativo',
    description: 'Todas las unidades se encuentran dentro de los límites normales.',
    color: 'text-green-600',
  },
  [EventCondition.CONDITION_WARNING]: {
    icon: AlertTriangle,
    label: 'Advertencia',
    description: 'Hay alertas leves que requieren seguimiento puntual.',
    color: 'text-amber-600',
  },
  [EventCondition.CONDITION_ERROR]: {
    icon: AlertCircle,
    label: 'Incidencia crítica',
    description: 'Se detectaron problemas importantes en servicios clave.',
    color: 'text-red-600',
  },
};

export function GlobalStatus() {
  const globalStatus = statusService.getGlobalStatus();
  const uptime = statusService.getUptime();
  const config = statusConfig[globalStatus];
  const Icon = config.icon;

  return (
    <div className="surface-card-strong p-8 border-l-4 border-brand">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-brand mb-3">Estado general</p>
          <h2 className="text-3xl font-semibold text-slate-950 mb-3">Disponibilidad del hospital</h2>
          <p className="text-sm leading-7 text-muted">{config.description} El panel centraliza la información crítica para decisión rápida.</p>
        </div>

        <div className="flex items-center gap-5 rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
          <div className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950/5 ${config.color}`}>
            <Icon className={`${config.color}`} size={28} />
          </div>
          <div>
            <StatusBadge condition={globalStatus} size="lg" />
            <p className="mt-3 text-3xl font-semibold text-slate-950">Disponibilidad {uptime}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

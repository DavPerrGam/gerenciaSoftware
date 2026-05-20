import type { Event } from '../types/index.js';
import { StatusBadge } from './StatusBadge';

interface IncidentTimelineProps {
  events: Event[];
}

export function IncidentTimeline({ events }: IncidentTimelineProps) {
  const sortedEvents = [...events].sort((a, b) =>
    new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
  );

  if (sortedEvents.length === 0) {
    return <p className="text-gray-500">No hay incidentes registrados.</p>;
  }

  return (
    <div className="space-y-6">
      {sortedEvents.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="timeline-marker h-3 w-3 rounded-full shadow-sm" />
            {index < sortedEvents.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 mt-2" />}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm w-full">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-semibold text-slate-950">{event.title}</h4>
                <p className="text-sm text-muted">{new Date(event.occurredAt).toLocaleString('es-CO')}</p>
              </div>
              <StatusBadge condition={event.condition} size="sm" />
            </div>
            <p className="mt-4 text-sm text-slate-600 leading-7">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

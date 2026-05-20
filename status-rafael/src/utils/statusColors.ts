import { EventCondition } from '../types/index.js';

export const getStatusColor = (condition: EventCondition): string => {
  switch (condition) {
    case EventCondition.CONDITION_ACTIVE:
      return 'bg-green-600';
    case EventCondition.CONDITION_WARNING:
      return 'bg-amber-600';
    case EventCondition.CONDITION_ERROR:
      return 'bg-red-600';
    default:
      return 'bg-gray-500';
  }
};

export const getStatusText = (condition: EventCondition): string => {
  switch (condition) {
    case EventCondition.CONDITION_ACTIVE:
      return 'Operativo';
    case EventCondition.CONDITION_WARNING:
      return 'Advertencia';
    case EventCondition.CONDITION_ERROR:
      return 'Error';
    default:
      return 'Desconocido';
  }
};

import type { Product, Report, Event } from '../types/index.js';

const STORAGE_KEYS = {
  PRODUCTS: 'sr_products',
  REPORTS: 'sr_reports',
  EVENTS: 'sr_events',
};

export const storageService = {
  getProducts: (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  saveProduct: (product: Product) => {
    const products = storageService.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index > -1) {
      products[index] = product;
    } else {
      products.push(product);
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  deleteProduct: (productId: string) => {
    const products = storageService.getProducts();
    const filtered = products.filter(p => p.id !== productId);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
  },

  getReports: (): Report[] => {
    const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
    return data ? JSON.parse(data) : [];
  },

  getReportsByProduct: (productId: string): Report[] => {
    return storageService.getReports().filter(r => r.productId === productId);
  },

  saveReport: (report: Report) => {
    const reports = storageService.getReports();
    const index = reports.findIndex(r => r.id === report.id);
    if (index > -1) {
      reports[index] = report;
    } else {
      reports.push(report);
    }
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  },

  deleteReport: (reportId: string) => {
    const reports = storageService.getReports();
    const filtered = reports.filter(r => r.id !== reportId);
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(filtered));
  },

  getEvents: (): Event[] => {
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return data ? JSON.parse(data) : [];
  },

  getEventsByProduct: (productId: string): Event[] => {
    return storageService.getEvents().filter(e => e.productId === productId);
  },

  getEventsByReport: (reportId: string): Event[] => {
    return storageService.getEvents().filter(e => e.reportId === reportId);
  },

  saveEvent: (event: Event) => {
    const events = storageService.getEvents();
    const index = events.findIndex(e => e.id === event.id);
    if (index > -1) {
      events[index] = event;
    } else {
      events.push(event);
    }
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  },

  deleteEvent: (eventId: string) => {
    const events = storageService.getEvents();
    const filtered = events.filter(e => e.id !== eventId);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(filtered));
  },
};
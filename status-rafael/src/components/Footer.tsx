import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-r from-brand-dark via-brand to-brand py-12 text-white" id="contacto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-8 md:grid-cols-3">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="mb-2 font-bold">Ubicación</h3>
              <p className="text-sm text-blue-100">Calle 6 # 11-50, Tunja, Boyacá</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="mb-2 font-bold">Contacto</h3>
              <p className="text-sm text-blue-100">Tel: +57 8 2345678</p>
              <p className="flex items-center gap-1.5 text-sm text-blue-100">
                <Mail size={14} />
                info@sanrafael.gov.co
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="mb-2 font-bold">Horarios</h3>
              <p className="text-sm text-blue-100">Lunes - Viernes: 8:00 - 18:00</p>
              <p className="text-sm text-blue-100">Emergencias: 24/7</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-sm text-blue-100">
          <p>© 2026 Hospital Universitario San Rafael de Tunja. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

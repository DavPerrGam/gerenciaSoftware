import { Link } from 'react-router-dom';
import { ChevronRight, Server } from 'lucide-react';

import type { Product } from '../types/index.js';
import { statusService } from '../services/status.service.js';
import { StatusBadge } from './StatusBadge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const status = statusService.getCurrentProductStatus(product.id);

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="product-card surface-card p-6 border-2 border-blue-200 hover:border-cyan-400 hover:shadow-cyan-400/20">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 shadow-md">
              <Server size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
              <p className="text-sm text-blue-600 font-medium mt-0.5">{product.type}</p>
            </div>
          </div>
          <StatusBadge condition={status} size="sm" />
        </div>

        <p className="text-gray-700 text-sm leading-relaxed mb-6 font-medium">{product.description}</p>

        <div className="flex items-center justify-between text-xs font-semibold text-blue-600 pt-4 border-t border-blue-100">
          <span>👤 {product.owner}</span>
          <ChevronRight size={16} className="text-cyan-500 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

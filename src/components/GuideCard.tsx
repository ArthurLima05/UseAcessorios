import React from 'react';
import { Download, Star } from 'lucide-react';
import { Guide } from '../types';

interface GuideCardProps {
  guide: Guide;
  onPurchase: (guide: Guide) => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide, onPurchase }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <div className="w-full h-80 bg-gradient-to-br from-[#970048] to-[#f8dbe0] flex items-center justify-center">
          <div className="text-white text-center p-8">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-xl font-bold mb-2">E-book</h3>
            <p className="text-sm opacity-90">Guia Digital</p>
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-[#970048] text-white px-3 py-1 rounded-full text-sm font-medium">
          50% OFF
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="text-yellow-400 fill-current" />
          ))}
          <span className="text-sm text-gray-600 ml-2">(127 avaliações)</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          {guide.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {guide.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#970048]">
              R$ {guide.price.toFixed(2).replace('.', ',')}
            </span>
            {guide.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                R$ {(guide.originalPrice / 100).toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => onPurchase(guide)}
            className="w-full bg-[#970048] text-white py-3 rounded-lg font-medium hover:bg-[#7a0039] transition-colors flex items-center justify-center space-x-2"
          >
            <Download size={18} />
            <span>Comprar Agora</span>
          </button>

          <div className="text-center">
            <span className="text-xs text-gray-500">Download imediato após pagamento</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>✓ Acesso vitalício</span>
            <span>✓ Suporte incluído</span>
          </div>
        </div>
      </div>
    </div>
  );
};
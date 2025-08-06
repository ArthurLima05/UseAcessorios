import React from 'react';
import { Download, Star, Eye } from 'lucide-react';
import { Guide } from '../types';
import { useNavigate } from 'react-router-dom';

interface GuideCardProps {
  guide: Guide;
  onPurchase: (guide: Guide) => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide, onPurchase }) => {
  const navigate = useNavigate();

  const handleSaibaMais = () => {
    if (guide.id === '1') {
      navigate('/guide/nunca-mais-erre-na-escolha');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300 w-full max-w-sm mx-auto">
      <div className="relative overflow-hidden">
        <img
          src="/capa-ebook.png"
          alt={guide.name}
          className="w-full h-64 sm:h-80 object-cover"
        />
        <div className="absolute top-4 left-4 bg-[#970048] text-white px-3 py-1 rounded-full text-sm font-medium">
          50% OFF
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="text-yellow-400 fill-current" />
          ))}
          <span className="text-xs sm:text-sm text-gray-600 ml-2">(127 avaliações)</span>
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          {guide.name}
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <span className="text-xl sm:text-2xl font-numeric font-bold text-[#970048]">
              R$ {guide.price.toFixed(2).replace('.', ',')}
            </span>
            {guide.originalPrice && (
              <span className="text-xs sm:text-sm font-numeric text-gray-500 line-through">
                R$ {(guide.originalPrice).toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleSaibaMais}
            className="w-full bg-gray-100 text-[#970048] py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 mb-2 text-sm sm:text-base"
          >
            <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>Saiba Mais</span>
          </button>

          <button
            onClick={() => onPurchase(guide)}
            className="w-full bg-[#970048] text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-[#7a0039] transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>Comprar Agora</span>
          </button>

          <div className="text-center">
            <span className="text-xs sm:text-sm text-gray-500">Download imediato após pagamento</span>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
            <span>✓ Acesso vitalício</span>
            <span>✓ Suporte incluído</span>
          </div>
        </div>
      </div>
    </div>
  );
};
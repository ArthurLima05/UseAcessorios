import React, { useState } from 'react';
import { Truck, Calculator, MapPin } from 'lucide-react';

interface ShippingCalculatorProps {
  onShippingCalculated?: (zipCode: string, items: any[]) => void;
}

export const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({
  onShippingCalculated
}) => {
  const [zipCode, setZipCode] = useState('');
  const [quantity, setQuantity] = useState(1);

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) {
      return numbers;
    }
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatZipCode(e.target.value);
    setZipCode(formatted);
  };

  const calculateShipping = () => {
    if (!zipCode || zipCode.length < 8) {
      alert('Digite um CEP válido');
      return;
    }

    // Aqui você pode integrar com sua API de frete
    if (onShippingCalculated) {
      onShippingCalculated(zipCode, [{ quantity }]);
    }
    
    // Por enquanto, apenas mostra uma mensagem
    alert(`CEP ${zipCode} - Quantidade: ${quantity}\nIntegração com API de frete será implementada.`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculateShipping();
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Truck className="text-[#970048]" size={20} />
        <h3 className="text-lg font-semibold text-gray-900">Calcular Frete</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CEP
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={zipCode}
                onChange={handleZipCodeChange}
                onKeyPress={handleKeyPress}
                placeholder="00000-000"
                maxLength={9}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048] text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048] text-sm"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={calculateShipping}
          disabled={!zipCode}
          className="w-full bg-[#970048] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#7a0039] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Calculator size={16} />
          <span>Calcular Frete</span>
        </button>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Frete será calculado na próxima etapa</p>
          <p>• Prazo de entrega varia conforme a região</p>
          <p>• Produto será enviado após confirmação do pagamento</p>
        </div>
      </div>
    </div>
  );
};
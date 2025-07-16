import React, { useState } from 'react';
import { Truck, Calculator, MapPin } from 'lucide-react';

interface ShippingCalculatorProps {
  productId: string;
  onShippingCalculated?: (shipping: number, days: number) => void;
}

export const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({
  productId,
  onShippingCalculated
}) => {
  const [zipCode, setZipCode] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    shippingCost: number;
    deliveryDays: number;
    freeShipping: boolean;
  } | null>(null);
  const [error, setError] = useState('');

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
    setError('');
    setResult(null);
  };

  const calculateShipping = async () => {
    if (!zipCode || zipCode.length < 8) {
      setError('Digite um CEP válido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/calculate-shipping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zipCode,
          items: [{ productId, quantity }]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao calcular frete');
      }

      const data = await response.json();
      setResult(data);
      
      if (onShippingCalculated) {
        onShippingCalculated(data.shippingCost, data.deliveryDays);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular frete');
    } finally {
      setLoading(false);
    }
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
          disabled={loading || !zipCode}
          className="w-full bg-[#970048] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#7a0039] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Calculando...</span>
            </>
          ) : (
            <>
              <Calculator size={16} />
              <span>Calcular Frete</span>
            </>
          )}
        </button>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Frete:</span>
                <span className="font-semibold text-[#970048]">
                  {result.freeShipping ? (
                    <span className="text-green-600">GRÁTIS</span>
                  ) : (
                    `R$ ${(result.shippingCost / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                  )}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Prazo de entrega:</span>
                <span className="font-semibold text-gray-900">
                  {result.deliveryDays} dias úteis
                </span>
              </div>

              {result.freeShipping && (
                <div className="text-xs text-green-600 bg-green-50 p-2 rounded mt-2">
                  🎉 Frete grátis! Compras acima de R$ 500,00
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Frete grátis para compras acima de R$ 500,00</p>
          <p>• Prazo de entrega não inclui finais de semana</p>
          <p>• Produto será enviado após confirmação do pagamento</p>
        </div>
      </div>
    </div>
  );
};
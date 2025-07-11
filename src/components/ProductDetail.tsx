import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onBack, 
  onAddToCart 
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-[#970048] hover:text-[#7a0039] transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Voltar aos produtos</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm">
              <img 
                src={product.images[selectedImageIndex]} 
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {product.featured && (
                <div className="absolute top-4 left-4 bg-[#970048] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Destaque
                </div>
              )}
              <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-[#f8dbe0] transition-colors">
                <Heart size={20} className="text-[#970048]" />
              </button>
            </div>
            
            <div className="flex space-x-3 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index 
                      ? 'border-[#970048]' 
                      : 'border-gray-200 hover:border-[#f8dbe0]'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(24 avaliações)</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-[#970048]">
                  R$ {product.price.toLocaleString('pt-BR')}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    R$ {product.originalPrice.toLocaleString('pt-BR')}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Especificações */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Especificações</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Material:</span>
                  <span className="ml-2 font-medium">Ouro 18k</span>
                </div>
                <div>
                  <span className="text-gray-600">Categoria:</span>
                  <span className="ml-2 font-medium capitalize">{product.category}</span>
                </div>
                <div>
                  <span className="text-gray-600">Garantia:</span>
                  <span className="ml-2 font-medium">2 anos</span>
                </div>
                <div>
                  <span className="text-gray-600">Certificado:</span>
                  <span className="ml-2 font-medium">Incluído</span>
                </div>
              </div>
            </div>

            {/* Quantidade e Compra */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <label className="text-sm font-medium text-gray-700">Quantidade:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#970048] text-white py-4 rounded-lg font-medium hover:bg-[#7a0039] transition-colors"
                >
                  Adicionar ao Carrinho
                </button>
                <button className="w-full border border-[#970048] text-[#970048] py-4 rounded-lg font-medium hover:bg-[#970048] hover:text-white transition-colors">
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* Benefícios */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#f8dbe0] p-2 rounded-full">
                    <Truck size={20} className="text-[#970048]" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Frete Grátis</div>
                    <div className="text-xs text-gray-600">Acima de R$ 500</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-[#f8dbe0] p-2 rounded-full">
                    <Shield size={20} className="text-[#970048]" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Garantia</div>
                    <div className="text-xs text-gray-600">2 anos</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-[#f8dbe0] p-2 rounded-full">
                    <RotateCcw size={20} className="text-[#970048]" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Troca</div>
                    <div className="text-xs text-gray-600">30 dias</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compartilhar */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Compartilhar:</span>
              <button className="flex items-center space-x-2 text-[#970048] hover:text-[#7a0039] transition-colors">
                <Share2 size={16} />
                <span className="text-sm">Compartilhar produto</span>
              </button>
            </div>
          </div>
        </div>

        {/* Produtos Relacionados */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Produtos Relacionados</h2>
          <div className="text-center py-12 text-gray-500">
            <p>Outros produtos da mesma categoria aparecerão aqui</p>
          </div>
        </div>
      </div>
    </div>
  );
};
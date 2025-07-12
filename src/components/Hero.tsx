import React from 'react';
import { Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-[#f8dbe0] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="text-[#970048]" size={24} />
              <span className="text-[#970048] font-medium">Coleção Exclusiva</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Acessórios que Contam
              <span className="text-[#970048]"> Sua História</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Descubra nossa coleção exclusiva de acessórios artesanais, criados com os mais finos materiais 
              e técnicas tradicionais para celebrar seus momentos especiais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#970048] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#7a0039] transition-colors">
                Ver Coleção
              </button>
              <button className="border border-[#970048] text-[#970048] px-8 py-3 rounded-lg font-medium hover:bg-[#970048] hover:text-white transition-colors">
                Saiba Mais
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Joia em destaque"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-[#970048]">50+</div>
              <div className="text-sm text-gray-600">Acessórios Únicos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
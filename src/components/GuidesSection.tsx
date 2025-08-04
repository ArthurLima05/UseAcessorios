import React from 'react';
import { BookOpen, Star, Award } from 'lucide-react';
import { GuideCard } from './GuideCard';
import { guides } from '../data/guides';
import { Guide } from '../types';

interface GuidesSectionProps {
  onPurchaseGuide: (guide: Guide) => void;
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({ onPurchaseGuide }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#970048] to-[#f8dbe0] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <BookOpen size={32} />
              <span className="text-xl font-medium">Guias Exclusivos</span>
            </div>
            <h1 class="text-5xl lg:text-6xl font-serif font-bold mb-6">
              Guias de Tendência
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Descubra os segredos para escolher as joias perfeitas com nossos guias especializados. 
              Conhecimento profissional ao seu alcance.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#f8dbe0] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="text-[#970048]" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Conhecimento Especializado</h3>
              <p className="text-gray-600">Guias criados por especialistas em joias com anos de experiência no mercado.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#f8dbe0] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="text-[#970048]" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Conteúdo Premium</h3>
              <p className="text-gray-600">Informações exclusivas e dicas práticas que você não encontra em outros lugares.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#f8dbe0] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="text-[#970048]" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resultados Garantidos</h3>
              <p className="text-gray-600">Aplique nossos métodos e veja a diferença na sua escolha de acessórios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Catalog */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 class="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">Guias</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transforme sua forma de escolher joias com nossos guias especializados. 
              Cada guia é cuidadosamente elaborado para te dar confiança em suas escolhas.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {guides.map(guide => (
              <GuideCard 
                key={guide.id} 
                guide={guide} 
                onPurchase={onPurchaseGuide}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f8dbe0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl font-serif font-bold text-gray-900 mb-4">
            Pronta para se tornar uma especialista em joias?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Nossos guias vão te dar toda a confiança que você precisa para fazer as melhores escolhas.
          </p>
          <button className="bg-[#970048] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#7a0039] transition-colors">
            Ver Todos os Guias
          </button>
        </div>
      </section>
    </div>
  );
};
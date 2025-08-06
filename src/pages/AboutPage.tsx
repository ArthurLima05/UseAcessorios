import React from 'react';
import { ArrowLeft, Award, Heart, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com botão voltar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-[#970048] hover:text-[#7a0039] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#970048] to-[#b8005a] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6">
            Sobre a Use Acessórios
          </h1>
          <p className="text-xl opacity-95 max-w-3xl mx-auto">
            Criamos acessórios únicos que celebram seus momentos mais especiais com elegância e sofisticação.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#970048] mb-6">
                Nossa História
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                A Use Acessórios nasceu da paixão por criar peças únicas que contam histórias. 
                Fundada em 2020, nossa marca se dedica a oferecer acessórios de alta qualidade 
                que complementam a personalidade única de cada mulher.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Cada peça é cuidadosamente selecionada e criada pensando na versatilidade, 
                elegância e durabilidade. Acreditamos que os acessórios certos podem transformar 
                qualquer look e elevar a autoestima de quem os usa.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Hoje, somos referência em acessórios femininos, atendendo mulheres que buscam 
                qualidade, estilo e sofisticação em cada detalhe.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Nossa história"
                className="w-full max-w-md rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#970048] mb-4">
              Nossos Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam cada decisão e cada peça que criamos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-[#970048] to-[#b8005a] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#970048] mb-3">Qualidade</h3>
              <p className="text-gray-600">
                Selecionamos apenas os melhores materiais para garantir durabilidade e beleza em cada peça.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-[#970048] to-[#b8005a] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#970048] mb-3">Paixão</h3>
              <p className="text-gray-600">
                Cada acessório é criado com amor e dedicação, pensando na mulher que irá usá-lo.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-[#970048] to-[#b8005a] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#970048] mb-3">Comunidade</h3>
              <p className="text-gray-600">
                Valorizamos cada cliente e construímos relacionamentos duradouros baseados na confiança.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-[#970048] to-[#b8005a] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#970048] mb-3">Tradição</h3>
              <p className="text-gray-600">
                Combinamos técnicas tradicionais com design moderno para criar peças atemporais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-[#970048] mb-4">Missão</h3>
              <p className="text-gray-700 leading-relaxed">
                Criar acessórios únicos e de qualidade que empoderem mulheres a expressarem 
                sua personalidade e se sentirem confiantes em qualquer ocasião.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-[#970048] mb-4">Visão</h3>
              <p className="text-gray-700 leading-relaxed">
                Ser a marca de acessórios femininos mais admirada do Brasil, reconhecida 
                pela qualidade, elegância e inovação em cada peça.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-[#970048] mb-4">Compromisso</h3>
              <p className="text-gray-700 leading-relaxed">
                Oferecer produtos excepcionais, atendimento personalizado e uma experiência 
                de compra única que supere as expectativas de nossas clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f8dbe0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Faça Parte da Nossa História
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Descubra nossa coleção e encontre a peça perfeita para você.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#970048] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#7a0039] transition-colors"
          >
            Ver Coleção
          </button>
        </div>
      </section>
    </div>
  );
};
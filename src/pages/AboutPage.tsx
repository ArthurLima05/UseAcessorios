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
      <section className="relative bg-gradient-to-br from-[#970048] via-[#b8005a] to-[#970048] text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative z-10">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-8 leading-tight">
              Nossa História
            </h1>
            <p className="text-xl lg:text-2xl opacity-95 max-w-4xl mx-auto leading-relaxed">
              Conheça a paixão por acessórios que transformou sonhos em realidade
            </p>
          </div>
        </div>
      </section>

      {/* Sobre a Proprietária */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#970048] mb-8">
                Conheça a Fundadora
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-[#970048]">Maria Fernanda Silva</strong> sempre teve uma paixão especial por acessórios.
                  Desde pequena, ela colecionava brincos, colares e pulseiras, sonhando em um dia criar suas próprias peças.
                </p>
                <p>
                  Formada em Design de Moda pela Universidade Anhembi Morumbi, Maria decidiu transformar sua paixão em negócio.
                  Em 2020, durante a pandemia, ela fundou a Use Acessórios com o objetivo de democratizar o acesso a joias de qualidade.
                </p>
                <p>
                  "Acredito que toda mulher merece se sentir especial e confiante. Os acessórios certos podem transformar não apenas um look,
                  mas também como nos sentimos sobre nós mesmas", diz Maria.
                </p>
                <p>
                  Hoje, a Use Acessórios é referência em acessórios femininos, atendendo milhares de clientes em todo o Brasil
                  com peças cuidadosamente selecionadas e um atendimento personalizado.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Maria Fernanda Silva - Fundadora"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#970048] text-white p-4 rounded-2xl shadow-lg">
                  <p className="font-serif font-bold text-lg">Fundadora</p>
                  <p className="text-sm opacity-90">Use Acessórios</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Jornada */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#970048] mb-6">
              Nossa Jornada
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma história de paixão, dedicação e crescimento constante
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#970048] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2020
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#970048] mb-2">Fundação</h3>
              <p className="text-gray-600">
                Nascimento da Use Acessórios com foco em qualidade e elegância
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#970048] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2021
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#970048] mb-2">Expansão</h3>
              <p className="text-gray-600">
                Ampliação do catálogo e início das vendas online em todo o Brasil
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#970048] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2022
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#970048] mb-2">Reconhecimento</h3>
              <p className="text-gray-600">
                Mais de 10.000 clientes satisfeitas e avaliações 5 estrelas
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#970048] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2024
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#970048] mb-2">Inovação</h3>
              <p className="text-gray-600">
                Lançamento de guias especializados e consultoria personalizada
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História Original */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#970048] mb-8">
                Nossa Essência
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  A Use Acessórios nasceu da paixão por criar peças únicas que contam histórias.
                  Cada acessório é cuidadosamente selecionado pensando na versatilidade,
                  elegância e durabilidade.
                </p>
                <p>
                  Acreditamos que os acessórios certos podem transformar qualquer look e elevar
                  a autoestima de quem os usa. Nossa missão vai além de vender produtos -
                  queremos empoderar mulheres através da moda.
                </p>
                <p>
                  Hoje, somos referência em acessórios femininos, atendendo mulheres que buscam
                  qualidade, estilo e sofisticação em cada detalhe. Cada cliente é única,
                  e nosso atendimento reflete essa individualidade.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Nossa essência"
                className="w-full max-w-md rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores - Mantido igual */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#970048] mb-6">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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

      {/* Missão, Visão e Valores - Mantido igual */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
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

      {/* CTA Section - Atualizado */}
      <section className="py-20 bg-gradient-to-r from-[#f8dbe0] to-[#970048]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
            Faça Parte da Nossa História
          </h2>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            Descubra nossa coleção e encontre a peça perfeita que conta a sua história
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-[#970048] text-white px-10 py-4 rounded-xl font-medium hover:bg-[#7a0039] transition-colors text-lg"
            >
              Ver Coleção
            </button>
            <button
              onClick={() => navigate('/guides')}
              className="border-2 border-[#970048] text-[#970048] px-10 py-4 rounded-xl font-medium hover:bg-[#970048] hover:text-white transition-colors text-lg"
            >
              Nossos Guias
            </button>
          </div>
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
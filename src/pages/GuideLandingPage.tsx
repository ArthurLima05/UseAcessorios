import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, CheckCircle, Star, Gift, Shield, Plus, ChevronLeft, ChevronRight, DollarSign, HelpCircle, Puzzle, Briefcase, Heart, PartyPopper, Coffee, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GuideLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentDemo, setCurrentDemo] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(86399); // 23:59:59 em segundos

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 86399);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-play testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-play demo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo(prev => (prev + 1) % demoSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const testimonials = [
    {
      id: 1,
      text: "Antes eu tinha gavetas cheias de joias que nunca usava. Agora sei exatamente qual peça usar para cada ocasião. Minha autoestima mudou completamente!",
      author: "Maria Silva",
      role: "Executiva, 34 anos",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 2,
      text: "O guia me ensinou a criar looks incríveis com peças que já tinha. Economizei muito dinheiro e ainda recebo elogios todos os dias!",
      author: "Ana Costa",
      role: "Empresária, 28 anos",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 3,
      text: "Sempre me sentia insegura com minhas escolhas. Agora tenho confiança para ir a qualquer evento sabendo que estou impecável.",
      author: "Julia Santos",
      role: "Advogada, 31 anos",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  const demoSlides = [
    "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
  ];

  const chapters = [
    { icon: <Briefcase size={24} className="text-white" />, title: 'Profissional', description: 'Joias elegantes e discretas para o ambiente corporativo e reuniões importantes' },
    { icon: <Heart size={24} className="text-white" />, title: 'Encontros', description: 'Combinações românticas e sofisticadas para conquistar em qualquer encontro' },
    { icon: <PartyPopper size={24} className="text-white" />, title: 'Festas e Eventos', description: 'Brilhe em casamentos, formaturas e eventos especiais com as joias certas' },
    { icon: <Coffee size={24} className="text-white" />, title: 'Dia a Dia', description: 'Peças versáteis e confortáveis para o cotidiano sem perder o estilo' },
    { icon: <Plane size={24} className="text-white" />, title: 'Praia e Viagem', description: 'Joias práticas e estilosas para suas aventuras e momentos de lazer' }
  ];

  const faqs = [
    {
      question: "Como recebo o material após a compra?",
      answer: "Após a confirmação do pagamento, você receberá por email o link para download do guia em PDF, além do acesso aos bônus."
    },
    {
      question: "O guia funciona para qualquer tipo de joia?",
      answer: "Sim! O guia aborda desde peças básicas até joias mais sofisticadas, ensinando como combinar cada tipo adequadamente."
    },
    {
      question: "Preciso ter muitas joias para aplicar as dicas?",
      answer: "Não! O guia ensina como maximizar o que você já tem e como fazer investimentos inteligentes em peças-chave."
    },
    {
      question: "Como funciona a garantia?",
      answer: "Você tem 7 dias para testar o material. Se não ficar satisfeita, devolvemos 100% do valor pago, sem perguntas."
    }
  ];

  const handlePurchase = () => {
    // Aqui você pode integrar com o sistema de pagamento
    alert('Redirecionando para o pagamento...');
  };

  return (
    <div className="min-h-screen bg-white">
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
      <section className="bg-gradient-to-r from-[#970048] to-[#b8005a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            NUNCA MAIS ERRE NA ESCOLHA DAS SUAS JOIAS:
            <br />
            <span className="text-yellow-300 block mt-2 text-2xl md:text-3xl font-normal">
              DESCUBRA O GUIA QUE TRANSFORMA QUALQUER LOOK COM ESTRATÉGIA E ESTILO
            </span>
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-4xl mx-auto">
            Não é sobre ter mil joias. Não é sobre gastar mais. Não é sobre seguir regras.
            É sobre fazer as escolhas certas — e ser notada por isso.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl mb-8">
            <div className="aspect-video flex items-center justify-center text-white">
              <div className="text-center">
                <Play size={64} className="mx-auto mb-4 opacity-70" />
                <p className="text-lg">Seu vídeo VSL será inserido aqui</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={handlePurchase}
              className="bg-[#970048] text-white px-14 py-5 rounded-full text-3xl font-semibold hover:bg-[#7a0039] transition-colors"
            >
              JÁ ESTOU DECIDIDA
            </button>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-[#970048] font-serif">
            Você já comprou uma joia linda, mas ela simplesmente não combinou com o seu look?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-2xl">
              <div className="bg-gradient-to-r from-[#970048] to-[#b8005a] p-4 rounded-full text-white flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <p className="font-medium">Gasta muito com joias que não usa</p>
            </div>
            <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-2xl">
              <div className="bg-gradient-to-r from-[#970048] to-[#b8005a] p-4 rounded-full text-white flex items-center justify-center">
                <HelpCircle size={24} />
              </div>
              <p className="font-medium">Nunca sabe o que combina com qual ocasião</p>
            </div>
            <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-2xl">
              <div className="bg-gradient-to-r from-[#970048] to-[#b8005a] p-4 rounded-full text-white flex items-center justify-center">
                <Puzzle size={24} />
              </div>
              <p className="font-medium">Sente que falta algo no look, mas não sabe o quê</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <img
              src="https://images.pexels.com/photos/1335751/pexels-photo-1335751.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Mulher escolhendo joias"
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#970048] font-serif">
            Elas também se sentiam perdidas... até descobrirem o guia.
          </h2>

          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg italic mb-6 text-gray-700 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].author}
                  className="w-16 h-16 rounded-full object-cover border-4 border-[#970048]"
                />
                <div>
                  <h4 className="font-semibold text-[#970048]">{testimonials[currentTestimonial].author}</h4>
                  <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => setCurrentTestimonial(prev => prev > 0 ? prev - 1 : testimonials.length - 1)}
                className="bg-[#970048] text-white p-3 rounded-full hover:bg-[#7a0039] transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)}
                className="bg-[#970048] text-white p-3 rounded-full hover:bg-[#7a0039] transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex justify-center space-x-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentTestimonial ? 'bg-[#970048]' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#970048] font-serif">
            O GUIA DEFINITIVO DE JOIAS PARA CADA OCASIÃO
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6 text-gray-700 leading-relaxed">
                Esse guia foi criado para mulheres que querem se sentir confiantes, elegantes e bem-vestidas em qualquer ocasião — sem precisar gastar uma fortuna ou depender de palpites.
              </p>
              <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                Nele, você vai encontrar orientações claras, dicas práticas e combinações certeiras para acertar nas suas joias todos os dias.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-[#970048]" size={20} />
                  <span className="font-medium">Combinações para cada ocasião</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-[#970048]" size={20} />
                  <span className="font-medium">Dicas de estilo profissional</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-[#970048]" size={20} />
                  <span className="font-medium">Estratégias de investimento inteligente</span>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className="bg-black text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                ADQUIRIR MATERIAL
              </button>
            </div>

            <div className="flex justify-center">
              <div className="max-w-sm">
                <img
                  src="/capa-ebook.png"
                  alt="Capa do Ebook"
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#970048] font-serif">
            VEJA COMO É O CONTEÚDO POR DENTRO
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Páginas reais do guia para você conhecer a qualidade do material
          </p>

          <div className="relative max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img
                src={demoSlides[currentDemo]}
                alt={`Página de demonstração ${currentDemo + 1}`}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => setCurrentDemo(prev => prev > 0 ? prev - 1 : demoSlides.length - 1)}
                className="bg-[#970048] text-white p-3 rounded-full hover:bg-[#7a0039] transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentDemo(prev => (prev + 1) % demoSlides.length)}
                className="bg-[#970048] text-white p-3 rounded-full hover:bg-[#7a0039] transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex justify-center space-x-2 mt-4">
              {demoSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDemo(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentDemo ? 'bg-[#970048]' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handlePurchase}
              className="bg-[#970048] text-white px-16 py-5 rounded-full text-2xl font-semibold hover:bg-[#7a0039] transition-colors"
            >
              ADQUIRIR MATERIAL
            </button>
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#970048] font-serif">
            CAPÍTULOS ORGANIZADOS POR OCASIÃO
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters.map((chapter, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-[#970048] to-[#b8005a] rounded-full flex items-center justify-center mx-auto mb-4">
                  {chapter.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#970048]">{chapter.title}</h3>
                <p className="text-gray-600 leading-relaxed">{chapter.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Partnership Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#970048] font-serif">
                TODAS AS JOIAS PODEM SER ENCONTRADAS NA USE ACESSÓRIOS
              </h2>
              <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                Todas as peças mencionadas no guia estão disponíveis na Use Acessórios,
                nossa loja com as melhores joias do mercado.
              </p>

              <div className="bg-white p-6 rounded-2xl border-l-4 border-[#970048] mb-8">
                <div className="flex items-center space-x-4">
                  <Gift className="text-[#970048]" size={40} />
                  <div>
                    <h3 className="text-xl font-semibold text-[#970048] mb-2">OFERTA ESPECIAL</h3>
                    <p className="text-gray-700">
                      Sua próxima compra na Use Acessórios sai com <strong>10% de desconto</strong>
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className="bg-[#970048] text-white px-12 py-5 rounded-lg text-2xl font-semibold hover:bg-[#7a0039] transition-colors"
              >
                ADQUIRIR PROMOÇÃO
              </button>
            </div>

            <div className="flex justify-center">
              <img
                src="/logoUseAcessorios.png"
                alt="Logo Use Acessórios"
                className="max-w-sm rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Price Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-300 font-serif">
            OFERTA ESPECIAL POR TEMPO LIMITADO
          </h2>

          <div className="bg-[#970048] p-6 rounded-2xl mb-8">
            <div className="text-3xl font-bold text-yellow-300 mb-2">
              {formatTime(timeLeft)}
            </div>
            <p>Restam apenas algumas horas para garantir essa oferta!</p>
          </div>

          <div className="mb-8">
            <div className="mb-4">
              <span className="block text-lg mb-2">Valor normal:</span>
              <span className="text-2xl font-numeric line-through text-gray-400">R$ 197</span>
            </div>
            <div>
              <span className="block text-lg mb-2">Hoje por apenas:</span>
              <span className="text-5xl font-numeric font-bold text-yellow-300 block">R$ 27</span>
              <span className="text-gray-300 font-numeric">ou 3x de R$ 9,00</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 bg-white bg-opacity-10 p-6 rounded-2xl mb-8">
            <Shield className="text-green-400" size={32} />
            <div>
              <h4 className="font-semibold text-green-400 mb-1">Garantia de 7 dias</h4>
              <p className="text-sm">Se não ficar satisfeita, devolvemos 100% do seu dinheiro</p>
            </div>
          </div>

          <button
            onClick={handlePurchase}
            className="bg-[#970048] text-white px-16 py-6 rounded-full text-2xl font-semibold hover:bg-[#7a0039] transition-colors animate-pulse mb-4"
          >
            GARANTIR MEU GUIA AGORA
          </button>

          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <Shield size={16} />
            <span className="text-sm">Compra 100% segura e protegida</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#970048] font-serif">
            PERGUNTAS FREQUENTES
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-[#970048] transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <Plus
                    size={20}
                    className={`transform transition-transform ${activeFaq === index ? 'rotate-45' : ''}`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
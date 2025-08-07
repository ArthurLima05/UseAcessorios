import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria o envio do formulário
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative z-10">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-8 leading-tight">
              Fale Conosco
            </h1>
            <p className="text-xl lg:text-2xl opacity-95 max-w-4xl mx-auto leading-relaxed">
              Estamos aqui para ajudar você a encontrar o acessório perfeito
            </p>
          </div>
        </div>
      </section>

      {/* Informações de Contato Rápido */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="bg-[#970048] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#970048] mb-2">Telefone</h3>
              <p className="font-numeric text-gray-900 text-lg">(11) 99999-9999</p>
              <p className="text-sm text-gray-600 mt-1">Segunda a sexta, 9h às 18h</p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="bg-[#970048] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#970048] mb-2">Email</h3>
              <p className="text-gray-900 text-lg">contato@useacessorios.com</p>
              <p className="text-sm text-gray-600 mt-1">Respondemos em até 24h</p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="bg-[#970048] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#970048] mb-2">WhatsApp</h3>
              <p className="font-numeric text-gray-900 text-lg">(11) 99999-9999</p>
              <p className="text-sm text-gray-600 mt-1">Atendimento rápido</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário e Informações */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Formulário */}
            <div className="bg-white p-10 rounded-3xl shadow-lg">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#970048] mb-8">
                Envie sua Mensagem
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Preencha o formulário e nossa equipe entrará em contato em até 24 horas.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-[#970048] focus:border-[#970048] transition-colors"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-[#970048] focus:border-[#970048] transition-colors"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-[#970048] focus:border-[#970048] transition-colors"
                    placeholder="Qual o motivo do seu contato?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-[#970048] focus:border-[#970048] transition-colors"
                    placeholder="Descreva sua dúvida ou mensagem..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#970048] text-white py-4 rounded-xl font-medium hover:bg-[#7a0039] transition-colors flex items-center justify-center space-x-2 text-lg"
                >
                  <Send size={20} />
                  <span>Enviar Mensagem</span>
                </button>
              </form>
            </div>

            {/* Informações Detalhadas */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <h2 className="text-3xl font-serif font-bold text-[#970048] mb-8">
                  Informações de Contato
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#f8dbe0] p-3 rounded-full">
                      <Phone className="text-[#970048]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Telefone</h3>
                      <p className="text-gray-600 font-numeric">(11) 99999-9999</p>
                      <p className="text-sm text-gray-500">Segunda a sexta, 9h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#f8dbe0] p-3 rounded-full">
                      <Mail className="text-[#970048]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">contato@useacessorios.com</p>
                      <p className="text-sm text-gray-500">Respondemos em até 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#f8dbe0] p-3 rounded-full">
                      <MapPin className="text-[#970048]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Endereço</h3>
                      <p className="text-gray-600">
                        Rua das Flores, 123<br />
                        Centro - São Paulo, SP<br />
                        CEP: 01234-567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#f8dbe0] p-3 rounded-full">
                      <Clock className="text-[#970048]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Horário</h3>
                      <p className="text-gray-600">
                        Segunda a sexta: 9h às 18h<br />
                        Sábado: 9h às 14h<br />
                        Domingo: Fechado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageCircle className="text-green-600" size={32} />
                  <h3 className="text-2xl font-serif font-semibold text-green-800">WhatsApp</h3>
                </div>
                <p className="text-green-700 mb-6 text-lg">
                  Para um atendimento mais rápido, entre em contato pelo WhatsApp!
                </p>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium"
                >
                  <MessageCircle size={20} />
                  <span>Conversar no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Rápido */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#970048] mb-6">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Talvez sua dúvida já esteja respondida aqui
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Como faço para trocar um produto?</h3>
              <p className="text-gray-600">
                Você tem até 30 dias para solicitar a troca. Entre em contato conosco com o número do pedido.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Qual o prazo de entrega?</h3>
              <p className="text-gray-600">
                O prazo varia de 3 a 7 dias úteis, dependendo da sua localização e do produto escolhido.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Vocês fazem peças personalizadas?</h3>
              <p className="text-gray-600">
                Sim! Entre em contato conosco para discutir suas ideias e receber um orçamento personalizado.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Como cuidar das minhas joias?</h3>
              <p className="text-gray-600">
                Enviamos um guia de cuidados com cada pedido. Também temos dicas no nosso blog.
              </p>
            </div>
          </div>
      </section>

    </div>
  );
};
  )
}
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
      <section className="bg-gradient-to-r from-[#970048] to-[#b8005a] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6">
            Entre em Contato
          </h1>
          <p className="text-xl opacity-95 max-w-3xl mx-auto">
            Estamos aqui para ajudar você. Entre em contato conosco e tire todas as suas dúvidas.
          </p>
        </div>
      </section>

      {/* Informações de Contato */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulário */}
            <div>
              <h2 className="text-4xl font-serif font-bold text-[#970048] mb-6">
                Envie sua Mensagem
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Preencha o formulário abaixo e nossa equipe entrará em contato com você em até 24 horas.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                    placeholder="Descreva sua dúvida ou mensagem..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#970048] text-white py-4 rounded-lg font-medium hover:bg-[#7a0039] transition-colors flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Enviar Mensagem</span>
                </button>
              </form>
            </div>

            {/* Informações de Contato */}
            <div>
              <h2 className="text-4xl font-serif font-bold text-[#970048] mb-6">
                Informações de Contato
              </h2>

              <div className="space-y-6 mb-8">
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
                    <h3 className="font-semibold text-gray-900 mb-1">Horário de Funcionamento</h3>
                    <p className="text-gray-600">
                      Segunda a sexta: 9h às 18h<br />
                      Sábado: 9h às 14h<br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <MessageCircle className="text-green-600" size={24} />
                  <h3 className="font-semibold text-green-800">WhatsApp</h3>
                </div>
                <p className="text-green-700 mb-4">
                  Para um atendimento mais rápido, entre em contato pelo WhatsApp!
                </p>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle size={18} />
                  <span>Conversar no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Rápido */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-[#970048] mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600">
              Talvez sua dúvida já esteja respondida aqui
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Como faço para trocar um produto?</h3>
              <p className="text-gray-600 text-sm">
                Você tem até 30 dias para solicitar a troca. Entre em contato conosco com o número do pedido.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Qual o prazo de entrega?</h3>
              <p className="text-gray-600 text-sm">
                O prazo varia de 3 a 7 dias úteis, dependendo da sua localização e do produto escolhido.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Vocês fazem peças personalizadas?</h3>
              <p className="text-gray-600 text-sm">
                Sim! Entre em contato conosco para discutir suas ideias e receber um orçamento personalizado.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Como cuidar das minhas joias?</h3>
              <p className="text-gray-600 text-sm">
                Enviamos um guia de cuidados com cada pedido. Também temos dicas no nosso blog.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
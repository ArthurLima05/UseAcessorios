import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logoUseAcessorios.png" 
                alt="Use Acessórios" 
                className="h-8 w-auto"
              />
              <h3 className="text-2xl font-bold text-[#f8dbe0]">Use Acessórios</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Criamos acessórios únicos que celebram seus momentos mais especiais com elegância e sofisticação.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#f8dbe0] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#f8dbe0] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#f8dbe0] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#f8dbe0] transition-colors">Início</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#f8dbe0] transition-colors">Coleções</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#f8dbe0] transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#f8dbe0] transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#f8dbe0] transition-colors">Anéis</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#f8dbe0] transition-colors">Colares</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#f8dbe0] transition-colors">Brincos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#f8dbe0] transition-colors">Pulseiras</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#f8dbe0]" />
                <span className="text-gray-400">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#f8dbe0]" />
                <span className="text-gray-400">contato@.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-[#f8dbe0]" />
                <span className="text-gray-400">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Use Acessórios. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
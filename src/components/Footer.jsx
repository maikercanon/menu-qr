import { FaLinkedin, FaGlobe, FaPhone, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="w-full max-w-4xl mt-6 mb-2 text-center p-4 bg-black rounded-xl border-2 border-yellow-400 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <a 
          href="https://www.linkedin.com/in/maiker-ca%C3%B1on-1620b828a/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-yellow-300 rounded-full p-1.5 text-black text-base hover:scale-110 transition-transform hover:bg-yellow-400"
          title="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a 
          href="https://maikercanon.github.io/portfolio-react/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-yellow-300 rounded-full p-1.5 text-black text-base hover:scale-110 transition-transform hover:bg-yellow-400"
          title="Página Web"
        >
          <FaGlobe />
        </a>
        
        <a 
          href="https://wa.me/573177530836" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-yellow-300 rounded-full p-1.5 text-black text-base hover:scale-110 transition-transform hover:bg-yellow-400"
          title="WhatsApp: 3177530836"
        >
          <FaWhatsapp />
        </a>
      </div>
      <p className="text-gray-50 text-sm font-medium">Made by SoftwaresMaiker</p>
    </div>
  );
};

export default Footer; 
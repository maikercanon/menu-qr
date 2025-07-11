import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import QRGenerator from './QRGenerator';

const CONTACT_STORAGE_KEY = 'contact_info';
const ADMIN_PASSWORD = 'admin123';
// Las categorías se obtendrán dinámicamente

const PublicMenu = () => {
  const [services, setServices] = useState([]);
  const [contact, setContact] = useState({
    phone: '3214017967',
    whatsapp: '3214017967',
    address: 'Crra 1ra # 30 05 Barrio Candido',
    hours: `Todos los días desde las 3 PM a 12 PM`,
    delivery: 'Domicilios disponibles en toda la ciudad'
  });
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    fetch('/data/menu.json')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(() => setServices([]));

    const savedContact = localStorage.getItem(CONTACT_STORAGE_KEY);
    if (savedContact) setContact(JSON.parse(savedContact));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setBlink(b => !b), 1000);
    return () => clearInterval(interval);
  }, []);


  // Obtener categorías únicas dinámicamente en el orden de aparición
  const categories = [];
  services.forEach(item => {
    if (item.category && !categories.includes(item.category)) {
      categories.push(item.category);
    }
  });
  // Agrupar los servicios por categoría
  const grouped = {};
  categories.forEach(cat => {
    grouped[cat] = services.filter(s => s.category === cat);
  });

  return (
    <div className="min-h-screen bg-black p-0 m-0 flex flex-col items-center justify-start">
      {/* Encabezado rojo con nombre y decoración */}
      <div className="w-full bg-gradient-to-r from-red-700 via-red-500 to-yellow-400 relative shadow-lg overflow-hidden">
        {/* Imagen decorativa a la derecha */}
        <img 
          src="/data/imagen_final.jpg" 
          alt="Decoración encabezado" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none select-none" 
          style={{ zIndex: 1, borderRadius: '0 0 2rem 2rem', border: '4px solid white' }}
        />
        <div className="max-w-2xl mx-auto flex flex-col items-center py-8 pb-16 relative z-10">
          {/* Arepas decorativas */}
          
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-center items-center my-8">
              <img 
                src="/data/logo.jpg" 
                alt="El Sabor de la Arepa Logo"
                className={`max-h-60 md:max-h-80 w-auto rounded-2xl shadow-lg transition-opacity duration-[1500ms] ${blink ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: 'rgba(255,255,255,0.0)' }}
              />
            </div>
            <div className="flex gap-2 mt-2"> 
              <a href="https://www.facebook.com/ElSABORDELAAREPA" target="_blank" rel="noopener noreferrer" className="bg-yellow-300 rounded-full p-2 text-black text-xl hover:scale-110 transition-transform"><FaFacebook /></a>
              <a href="https://www.instagram.com/elsabordelaarepa01/" target="_blank" rel="noopener noreferrer" className="bg-yellow-300 rounded-full p-2 text-black text-xl hover:scale-110 transition-transform"><FaInstagram /></a>
              <a href="https://wa.me/573214017967" target="_blank" rel="noopener noreferrer" className="bg-yellow-300 rounded-full p-2 text-black text-xl hover:scale-110 transition-transform"><FaWhatsapp /></a>
            </div>
          </div>
        </div>
      </div>
      {/* Cartel MENÚ */}
      <div className="relative z-10 flex flex-col items-center" style={{ marginTop: '-1.5rem', marginBottom: '2.5rem' }}>
        <span className="bg-white text-black text-2xl md:text-3xl font-bold px-10 py-2 rounded-xl border-4 border-yellow-400 shadow-lg tracking-widest" style={{ letterSpacing: '0.12em', boxShadow: '0 8px 24px 0 rgba(0,0,0,0.25)' }}>MENÚ</span>
      </div>
      {/* Contenido principal: categorías dinámicas */}
      <div className="w-full max-w-4xl bg-black rounded-2xl shadow-2xl border-4 border-yellow-400 px-2 md:px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <div key={category} className="flex flex-col items-start">
            <h2 className="text-white text-2xl md:text-3xl font-extrabold mb-2 border-b-4 border-yellow-400 pb-1 w-full flex items-center gap-2 uppercase tracking-wider">
              {category}
            </h2>
            <div className="w-full flex flex-col gap-4 mt-2">
              {grouped[category] && grouped[category].map((service, idx) => (
                <div key={service._id || idx} className="flex items-center justify-between w-full">
                  <div>
                    <div className="text-white text-lg md:text-xl font-bold leading-tight">{service.name}</div>
                    {service.description && <div className="text-gray-200 text-sm md:text-base leading-tight">{service.description}</div>}
                  </div>
                  <span className="bg-white text-black font-bold px-4 py-1 rounded-full shadow border-2 border-gray-300 text-lg md:text-xl ml-4 min-w-[90px] text-center">${service.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* QR destacado al final, reemplazando el login/admin */}
      
      {/* Sección de contacto */}
      <div className="w-full max-w-4xl mt-8 bg-black rounded-2xl shadow-2xl border-4 border-yellow-400 px-4 py-6">
        <h2 className="text-white text-2xl md:text-3xl font-extrabold mb-4 border-b-4 border-yellow-400 pb-2 flex items-center gap-2 uppercase tracking-wider">
          Contacto y Domicilios
        </h2>
        <div className="flex flex-col gap-2 text-yellow-200 text-lg md:text-xl">
          <span><strong className="text-white">Teléfono:</strong> {contact.phone}</span>
          <span><strong className="text-white">WhatsApp:</strong> {contact.whatsapp}</span>
          <span><strong className="text-white">Dirección:</strong> {contact.address}</span>
          
          <span><strong className="text-white">Horarios:</strong><br/>
            {contact.hours.split('\n').map((line, idx) => (
              <span key={idx}>{line}<br/></span>
            ))}
          </span>
          <span><strong className="text-white">Domicilios:</strong> {contact.delivery}</span>
        </div>
      </div>
      <div className="w-full max-w-4xl mt-8 text-center p-6 bg-black rounded-2xl border-4 border-yellow-400 flex flex-col items-center justify-center">
        <QRGenerator />
      </div>
    </div>
  );
};

export default PublicMenu; 
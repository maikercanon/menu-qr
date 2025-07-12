import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

const QRGenerator = () => {
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    // Usar la URL de Vercel directamente
    setQrUrl('https://menu-qr-alpha.vercel.app/');
  }, []);

  const downloadQR = () => {
    const svg = document.querySelector('#qr-code svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const pngFile = canvas.toBlob((blob) => {
          const downloadLink = document.createElement('a');
          downloadLink.download = 'menu-qr.png';
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.click();
        });
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div>
      
      <div className="text-center bg-gray-50 rounded-lg p-6">
        <div id="qr-code" className="inline-block bg-white p-4 rounded-lg mb-4">
          <QRCode 
            value={qrUrl}
            size={200}
            level="H"
            fgColor="#000000"
            bgColor="#ffffff"
          />
        </div>
        <div className="mb-4 space-y-2">
          
          <p className="text-black-900 text-xs-700">
            Escanea este código QR para ver el menú y la información de contacto
          </p>
        </div>
        <button 
          onClick={downloadQR}
          className="bg-yellow-700 text-white border-none rounded-lg px-6 py-3 font-bold hover:bg-green-700 transition-colors"
        >
          📥 Descargar QR
        </button>
      </div>
    </div>
  );
};

export default QRGenerator; 
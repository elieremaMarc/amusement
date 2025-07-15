import { useLocation,useNavigate } from "react-router-dom";

export default function Qrcode() {
  const location = useLocation();
  const { qr_code } = location.state || {};
    const navigate = useNavigate()

  console.log(qr_code)
  const copier = ()=>{
     const urlToCopy = `http://localhost:5173/qrcode?${qr_code}`;
    navigator.clipboard.writeText(urlToCopy).then(
      () => {
  
        alert('Lien copié avec succès')
      },
      () => {
        alert("Désolé nous n'avons pas pu copier le lien")

      }
    );
  }

  const retour =()=> {
    navigate("/acceuil")
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Voici votre QR Code</h1>

      {qr_code ? (
        <>
          <img
            src={`data:image/png;base64,${qr_code}`}
            alt="QR Code"
            className="w-64 h-64 border-2 border-gray-400 rounded-lg shadow-lg"
          />
          <a
            href={`data:image/png;base64,${qr_code}`}
            download="qrcode.png"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Télécharger
          </a>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition" onClick={copier}>Copier</button>
          <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition" onClick={retour}>Retour</button>
        </>
      ) : (
        <p className="text-red-500">QR code non disponible.</p>
      )}
    </div>
  );
}

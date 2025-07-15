import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"


const Generator = () => {
  const [nom, setnom] = useState<string>("");
  const [prenom, setprenom] = useState<string>("");
  const [mail, setmail] = useState<string>("");
  const [qrlien, setqrlien] = useState<string>("");
  const nameref = useRef<HTMLInputElement>(null);
  const surnameref = useRef<HTMLInputElement>(null);
  const mailref = useRef<HTMLInputElement>(null);
  const qrlienref = useRef<HTMLInputElement>(null);

  const handlenom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnom(e.target.value);
    if (nameref.current) {
    nameref.current.classList.add("p-4");
    setTimeout(() => {
      nameref.current && nameref.current.classList.remove("p-4");
    }, 50);
}


  };

  const handleprenom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setprenom(e.target.value);
    if(surnameref.current){
        surnameref.current.classList.add("p-4");
    setTimeout(() => {
      surnameref.current && surnameref.current.classList.remove("p-4");
    }, 50);
    }
 
  };

  const handlemail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmail(e.target.value);
    if(mailref.current){
        mailref.current.classList.add("p-4");
    setTimeout(() => {
     mailref.current && mailref.current.classList.remove("p-4");
    }, 50);

    }
  };

  const handlqrlien = (e: React.ChangeEvent<HTMLInputElement>) => {
    setqrlien(e.target.value);
   if(qrlienref.current){
     qrlienref.current.classList.add("p-4");
    setTimeout(() => {
     qrlienref.current && qrlienref.current.classList.remove("p-4");
    }, 50);
   }
  
  };

 const navigate = useNavigate();

  const handlesubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const currentData = {
    nom,
    prenom,
    mail,
    lien: qrlien,
  };
 

  const params = new URLSearchParams(currentData).toString();

  try {
    const response = await axios.get(`https://mon-back-flask.onrender.com/api?${params}`);
    console.log("Réponse du serveur :", response.data);

    const redirectUrl = response.data.qr_image_base64;
    navigate("/qrcode?"+response.data.qr_image_base64, { state: { qr_code: redirectUrl } });

  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
  }


};



  return (
    <div className="Generator">
      {/* Navbar */}
      <nav className="bg-blue-500 p-4 opacity-75">
        <h1 className="text-white text-center text-3xl font-bold">QCG BABY</h1>
      </nav>

      {/* Formulaire pour la génération d'un identifiant unique */}
      <form
        action=""
        method="get"
        className=" m-3 p-10 space-y-6 max-w-lg mx-auto bg-white shadow-xl rounded-lg border-2 border-blue-300"
        onSubmit={handlesubmit}
      >
        <h1 className="text-center text-blue-500 text-xl font-semibold">Génère ton qr code</h1>
        {/* Nom */}
        <div className="space-y-3">
          <p className="text-lg font-semibold">Nom:</p>
          <input
            type="text"
            value={nom}
            onChange={handlenom}
            className="w-full p-2 border-2 focus:outline-none focus:shadow-xl focus:rounded-lg transition-all duration-200 ease-in-out"
            ref={nameref}
            placeholder="ex: Dev"
            required
          />
        </div>

        {/* Prénom */}
        <div className="space-y-3">
          <p className="text-lg font-semibold">Prénom:</p>
          <input
            type="text"
            value={prenom}
            onChange={handleprenom}
            className="w-full p-2 border-2 focus:outline-none focus:shadow-xl focus:rounded-lg transition-all duration-200 ease-in-out"
            ref={surnameref}
            placeholder="ex: Icon"
            required
          />
        </div>

        {/* Mail */}
        <div className="space-y-3">
          <p className="text-lg font-semibold">Mail:</p>
          <input
            type="email"
            value={mail}
            onChange={handlemail}
            className="w-full p-2 border-2 focus:outline-none focus:shadow-xl focus:rounded-lg transition-all duration-200 ease-in-out"
            ref={mailref}
            placeholder="ex: dev_icon@gmail.com"
            required
          />
        </div>

        {/* Lien du QR Code */}
        <div className="space-y-3">
          <p className="text-lg font-semibold">Lien du QR Code:</p>
          <input
            type="text"
            value={qrlien}
            onChange={handlqrlien}
            className="w-full p-2 border-2 focus:outline-none focus:shadow-xl focus:rounded-lg transition-all duration-200 ease-in-out"
            ref={qrlienref}
            placeholder="ex: monlienqrcode.com"
            required
          />
        </div>

        {/* Submit Button */}
        <input
          type="submit"
          value="Générer"
          className="w-full p-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300 ease-in-out cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Generator;

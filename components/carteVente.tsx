import React, { useState } from "react";

interface Post {
  id: number;
  titre: string;
  description: string;
  images: string;
  imageSources?: string[];
  prix?: string;
  type: 'vente' | 'realisation';
  sousType?: string;
}

type CarteProps = {
  post: Post;
};

const FIXED_PHONE_NUMBER = "2250757524050";

export default function CarteProduitOuRealisation({ post }: CarteProps) {
  const [detail, setDetail] = useState(false);
  const [index, setIndex] = useState(0);

  const fallbackDescription = "Aucune description fournie.";

  const getDisplayedImageUrl = () => {
    if (
      post.imageSources &&
      post.imageSources.length > index &&
      typeof post.imageSources[index] === 'string' &&
      post.imageSources[index] !== ''
    ) {
      return post.imageSources[index];
    }
    return '';
  };

  const voirDetail = () => {
    setDetail(!detail);
    if (detail) setIndex(0);
  };

  const suivant = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post.imageSources && post.imageSources.length > 1) {
      setIndex((prev) =>
  post.imageSources && post.imageSources.length > 0
    ? prev < post.imageSources.length - 1
      ? prev + 1
      : 0
    : 0
);

    }
  };

  const precedent = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post.imageSources && post.imageSources.length > 1) {
      setIndex((prev) =>
  post.imageSources && post.imageSources.length > 0
    ? prev < post.imageSources.length - 1
      ? prev + 1
      : 0
    : 0
);

    }
  };

  const handleWhatsAppContact = () => {
  const hour = new Date().getHours();
  const greeting = hour < 18 ? "Bonjour" : "Bonsoir";
  const titre = post.titre;
  const desc = post.description || fallbackDescription;

  let msg = `${greeting} Mr/Mme,\n\n`;
  msg += `Je suis intéressé(e) par l'offre suivante :\n\n`;
  msg += `📌 *Titre* : ${titre}\n`;
  msg += `📝 *Description* : ${desc}\n`;

  if (post.type === 'vente' && post.prix) {
    msg += `💰 *Prix* : ${post.prix}\n`;
  }

  msg += `\nCe service/produit est-il toujours disponible ? Merci de me revenir dès que possible.\n\nCordialement.`;

  const encoded = encodeURIComponent(msg);
  const url = `https://wa.me/${FIXED_PHONE_NUMBER}?text=${encoded}`;
  window.open(url, '_blank');
};


  const callLink = `tel:${FIXED_PHONE_NUMBER}`;

  const hasMultipleImages = post.imageSources && post.imageSources.length > 1;

  return (
    <>
      <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
        <div className="relative h-48 overflow-hidden">
          <img
            src={getDisplayedImageUrl()}
            alt={post.titre || "Image"}
            className="w-full h-full object-cover"
          />
          {post.type === 'vente' && post.prix && (
            <div className="absolute top-2 right-2 bg-white text-gray-800 px-3 py-1 text-sm font-semibold rounded shadow">
              {post.prix}
            </div>
          )}
          {hasMultipleImages && (
            <>
              <div className="absolute bottom-2 right-2 bg-white text-gray-800 px-2 py-1 text-xs rounded shadow">
                {index + 1}/{post.imageSources!.length} photos
              </div>
              <div className="absolute inset-0 flex items-center justify-between px-2">
                <button onClick={precedent} className="bg-black bg-opacity-50 text-white p-1 rounded-full">
                  ◀
                </button>
                <button onClick={suivant} className="bg-black bg-opacity-50 text-white p-1 rounded-full">
                  ▶
                </button>
              </div>
            </>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-1">{post.titre}</h2>
          <p className="text-sm text-gray-600 mb-3">
            {post.description ? (post.description.length > 90 ? post.description.slice(0, 90) + "..." : post.description) : fallbackDescription}
          </p>
          <button onClick={voirDetail} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">
            Consulter l'offre
          </button>
        </div>
      </div>

      {detail && (
        <div className="fixed inset-0 bg-white bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
            <button onClick={voirDetail} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl">×</button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img src={getDisplayedImageUrl()} alt={post.titre} className="rounded-lg w-full object-cover" />
                {hasMultipleImages && (
                  <div className="flex justify-center space-x-3 mt-3">
                    <button onClick={precedent} className="bg-gray-200 p-2 rounded">◀</button>
                    <button onClick={suivant} className="bg-gray-200 p-2 rounded">▶</button>
                  </div>
                )}
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-2">{post.titre}</h3>
                <p className="text-gray-700 mb-4">{post.description || fallbackDescription}</p>
                {post.type === 'vente' && (
                  <>
                    {post.prix && <div className="text-2xl font-bold text-orange-600 mb-4">{post.prix}</div>}
                    <button
                      onClick={handleWhatsAppContact}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mb-2"
                    >
                      Contacter sur WhatsApp
                    </button>
                    <a
                      href={callLink}
                      className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                    >
                      Appel direct
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

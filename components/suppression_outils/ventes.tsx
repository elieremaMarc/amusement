// VoletVente.tsx
import React, { useState } from "react";

// Déclaration de type pour une vente (avec le champ imageSources déjà parsé)
type Vente = {
  id: number;
  titre: string;
  description: string;
  images: string;
  imageSources: string[]; // Le tableau des sources d'images Base64, prêt à l'emploi
  prix: string;
};

interface VoletVenteProps {
  ventes: Vente[];
  onDelete: (id: number) => void;
}

export default function VoletVente({ ventes, onDelete }: VoletVenteProps) {
  return (
    <div className="space-y-8 p-4">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-orange-500 pb-2">
        Nos Ventes Disponibles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ventes.length > 0 ? (
          ventes.map((post) => {
            const allImageSources = post.imageSources; // Le tableau d'images est déjà prêt

            return (
              <div
                key={post.id}
                className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col h-full"
              >
                {/* Conditionnel pour afficher le slider ou le message "pas d'image" */}
                {allImageSources.length > 0 ? (
                  <ImageSlider images={allImageSources} title={post.titre} />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                    Image(s) non disponible(s)
                  </div>
                )}

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {post.titre} <span className="text-sm font-normal text-gray-500">(ID: {post.id})</span>
                  </h3>
                  <p className="text-gray-700 text-sm mb-3 flex-grow">{post.description}</p>
                  <p className="text-2xl font-extrabold text-orange-600 mt-auto">{post.prix}</p>
                  <button
                    onClick={() => onDelete(post.id)}
                    className="mt-4 w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out text-lg font-semibold"
                  >
                    Supprimer cette vente
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            Aucune vente à afficher pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}

// --- Composant ImageSlider pour gérer le défilement des images ---
interface ImageSliderProps {
    images: string[];
    title: string; // Pour le texte alternatif de l'image
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, title }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const showNavigation = images.length > 1; // Afficher les boutons uniquement s'il y a plus d'une image

    return (
        <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
            {/* Conteneur flex interne pour s'assurer que l'image est centrée */}
            <div className="flex items-center justify-center w-full h-full">
                <img
                    src={images[currentImageIndex]}
                    alt={`${title} - Image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain" // Utilise object-contain pour éviter de couper l'image
                />
            </div>

            {showNavigation && (
                <>
                    <button
                        onClick={goToPreviousImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
                        aria-label="Image précédente"
                    >
                        &lt; {/* Flèche gauche */}
                    </button>
                    <button
                        onClick={goToNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
                        aria-label="Image suivante"
                    >
                        &gt; {/* Flèche droite */}
                    </button>
                </>
            )}

            {showNavigation && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1 z-10">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'} border border-gray-600 cursor-pointer`}
                            onClick={() => setCurrentImageIndex(index)}
                            aria-label={`Aller à l'image ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};  
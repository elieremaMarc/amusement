

export default function Choix({ Admin }: { Admin: () => void }) {

    // Fonction pour rediriger vers la page d'accueil utilisateur
    const handleUtilisateurClick = () => {
        // Correction ici : pour rediriger, il faut assigner la nouvelle URL
        window.location.href = "/acceuil";
        // Ou, si vous utilisez React Router (plus courant dans les apps React), ce serait:
        // navigate("/acceuil");
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    Êtes-vous utilisateur ou administrateur ?
                </h1>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg
                                   transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50
                                   text-lg"
                        onClick={handleUtilisateurClick}
                    >
                        Utilisateur
                    </button>
                    <button
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg
                                   transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50
                                   text-lg"
                        onClick={Admin}
                    >
                        Administrateur
                    </button>
                </div>
            </div>
        </div>
    );
}
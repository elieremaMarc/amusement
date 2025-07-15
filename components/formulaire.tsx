interface FormulaireProps {
  Valid: (e: React.FormEvent<HTMLFormElement>) => void;
}


export default function Formulaire({ Valid }: FormulaireProps) {

  return (

    <form className="formulaire max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6" onSubmit={Valid} method="POST">
      
      <div className="nom space-y-2">
        <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          name="nom"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="motdepasse space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input
          type="password"
          name="password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-orange-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Se connecter
      </button>
    </form>
  )
}

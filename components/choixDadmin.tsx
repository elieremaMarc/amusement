interface ChoixAdminProps {
  post: any; // ou définis un vrai type si tu l’as
  suppr: () => void;
}



export default function ChoixAdmin({ post, suppr }: ChoixAdminProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center p-6 mt-45">
      <button className="w-40 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300" onClick={post}>
        Poster
      </button>
      <button className="w-40 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition duration-300" onClick={suppr}>
        Supprimer
      </button>
    </div>
  );
}


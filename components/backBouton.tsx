export default function Back({ click }: { click: () => void }){
    return( 
        <div className="back">
            <button className="bg-orange-500 p-2 rounded-lg relative bottom-0 right-2 mt-4 " onClick={click}>Retour</button>
        </div>
    )
}
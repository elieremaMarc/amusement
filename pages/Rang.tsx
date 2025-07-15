import Navbar from "../components/navbar"
import { useState } from "react"
import Choix from "../components/choixpersonnalite"
import Formulaire from "../components/formulaire"
import ChoixAdmin from "../components/choixDadmin"
import Back from "../components/backBouton"
import FormulairePost from "../components/poster"
import Suppression from "../components/supprimer"

export default function Rang(){
    const [connecter,setconnecter] = useState<boolean>(false)
    const [poster,setposter] = useState<boolean>(false)
    const [supprimer,setsupprimer] = useState<boolean>(false)
    const [Action,setaction] = useState<boolean>(false)
    
    const nom = import.meta.env.VITE_ADMIN_NAME
    const password = import.meta.env.VITE_ADMIN_PASSWORD

    const [choixperso,setchoixperso] = useState<boolean>(true)
    const [passerelle,setpasserelle] = useState<boolean>(false)


    const choixAdmin = ()=>{
        setpasserelle(!passerelle)
        setchoixperso(!choixperso)
    }

    const faireUnpost = ()=>{
      setposter(true)
      setaction(false)
    }
    const faireUnesuppression = ()=>{
      setsupprimer(true)
      setaction(false)
    }

   const Valid = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  const nomEntree = (e.currentTarget.querySelector('input[name="nom"]') as HTMLInputElement)?.value
  const passwordEntree = (e.currentTarget.querySelector('input[name="password"]') as HTMLInputElement)?.value
 
  if(nomEntree === nom && passwordEntree === password ){

    setconnecter(true)
    setaction(true)
    setpasserelle(false)
    alert("Bienvenue " + nomEntree + " heureux de vous revoir.")
  }
  else{
    alert("non")
  }
}

    return (


        <div className="admin">

            {/* connexion */}
            {connecter && <Navbar admin={true}></Navbar>}

            {choixperso && <Choix Admin={choixAdmin} ></Choix>}

            {passerelle && <div className="formulaire">
              <Formulaire Valid={Valid}></Formulaire>
              <Back click={()=>{setpasserelle(false);setchoixperso(true)}}></Back>
            </div> }

            {Action && <div className="action">
              <ChoixAdmin post={faireUnpost} suppr={faireUnesuppression} ></ChoixAdmin >
                <Back click={()=>{setconnecter(false);setaction(false);setpasserelle(true)}}></Back>
            </div> }

            {poster && <div className="post">
              <FormulairePost></FormulairePost>
              <Back click={()=>{
                setposter(false)
                setaction(true)
              }}></Back>
            </div> }
            {supprimer && <div className="supression">
              <Suppression></Suppression>
              <Back click={()=>{
                setsupprimer(false)
                setaction(true)
              }}></Back>    
              </div>}

        </div>



    )
}
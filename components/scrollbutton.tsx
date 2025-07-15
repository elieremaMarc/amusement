import { useEffect, useState } from "react"

export default function ScrollButton(){
    const [display,setdisplay] = useState<boolean>(true)

    useEffect(()=>{
      const handleScroll = ()=>{
          if (window.scrollY > 100){
            setdisplay(true)
        }
        else{
            setdisplay(false)
        }
      }
        window.addEventListener("scroll",handleScroll)  
        return ()=> window.removeEventListener("scroll",handleScroll)
    },[])         

    return( 
        <div className="fixed bottom-8 right-8 z-50">
            {display && <a href="#top" className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition duration-300 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
            </a>}
        </div>
    )
}
import { useContext, useEffect } from "react"
import authContext from '../context/auth/authContext'


export default function Home() {

  const { usuarioAutenticado } = useContext(authContext);

  useEffect(() => {
    usuarioAutenticado();
  },[])
  
  

  return (
      <h1 className="text-2xl text-center">Bienvenido a Next.js</h1>
  )
}

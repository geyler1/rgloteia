import { signIn, getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

const Login = (props) => {
  const [recargas, setRecargas] = useState(null)
  const [retiros, setRetiros] = useState(null)

  const buscarRecargas = async () => {
    var { data: recargas } = await axios.post(
      `/api/datos/admin/recargas`,{
        pagina: 1
      }
    );
    if(recargas?.docs?.[0]?.uid){
      setRecargas(recargas?.docs?.[0]?.uid)
    }
    console.log(recargas?.docs?.[0]?.uid)
  };

  const buscarRetiros = async () => {
    var { data: retiros } = await axios.post(
      `/api/datos/admin/recargas/retiros`,{
        pagina: 1
      }
    );
    if(retiros?.docs?.[0]?.uid){
      setRetiros(retiros?.docs?.[0]?.uid)
    }
    console.log(retiros?.docs?.[0]?.uid)
  };

  useEffect(() => {
    buscarRetiros();
    buscarRecargas();
  },[])

  return (
    <div className="bg-slate-100 w-screen h-screen flex flex-wrap min-w-full">
      <Head>
        <title>4dm1n1strac10n</title>
        <meta name="description" content="... 4dm1n1strac10n ...." />
        <meta name="robots" content="noindex,nofollow"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-3xl mx-auto my-3">
        <ul className="flex m-3 flex-wrap justify-start items-center">
          <li className={`px-5 mb-3 py-2 block text-base relative bg-green-700 border-2 border-transparent hover:bg-black text-white rounded-full mr-3`}>
            <Link href='/'>
            <a>rgloteria.com</a>
            </Link>
          </li>
          <li className='px-5 mb-3 block py-2 text-base rounded-full border-2 mr-3 bg-transparent text-slate-700 border-slate-400'>
            <Link href='/4dm1n1str4c10n'>
            <a>Inicio</a>
            </Link>
          </li>
          <li className={`px-5 mb-3 py-2 block text-base relative bg-slate-700 border-2 border-transparent hover:bg-black text-white rounded-full mr-3 
          ${recargas ? "after:content-[''] after:absolute after:-top-1 after:bg-green-500 after:w-3 after:h-3 after:rounded-full" : ''}`}>
            <Link href='/4dm1n1str4c10n/recargas'>
            <a>Recargas</a>
            </Link>
          </li>
          <li className={`px-5 mb-3 py-2 block text-base relative bg-slate-700 border-2 border-transparent hover:bg-black text-white rounded-full mr-3
          ${retiros ? "after:content-[''] after:absolute after:-top-1 after:bg-red-500 after:w-3 after:h-3 after:rounded-full" : ''}`}>
            <Link href='/4dm1n1str4c10n/retiros'>
            <a>Retiros</a>
            </Link>
          </li>
          <li className={`px-5 mb-3 py-2 block text-base relative bg-slate-700 border-2 border-transparent hover:bg-black text-white rounded-full mr-3`}>
            <Link href='/4dm1n1str4c10n/usuarios'>
            <a>Usuarios</a>
            </Link>
          </li>
          <li className={`px-5 mb-3 py-2 block text-base relative bg-slate-700 border-2 border-transparent hover:bg-black text-white rounded-full mr-3`}>
            <Link href='/4dm1n1str4c10n/numeros'>
            <a># Comprados</a>
            </Link>
          </li>
          <li className={`px-5 mb-3 py-2 block text-base relative bg-slate-700 border-2 border-transparent hover:bg-black text-white rounded-full mr-3`}>
            <Link href='/4dm1n1str4c10n/numeros-ganadores'>
            <a># Ganadores</a>
            </Link>
          </li>
          <li className={`px-5 mb-3 py-2 block text-base relative bg-slate-700 border-2 border-transparent hover:bg-black text-white rounded-full mr-3`}>
            <Link href='/4dm1n1str4c10n/numeros-hoy'>
            <a># Jugados hoy</a>
            </Link>
          </li>
          <li className={`px-5 mb-3 py-2 block text-base relative bg-slate-700 border-2 border-transparent hover:bg-black text-white rounded-full mr-3`}>
            <Link href='/4dm1n1str4c10n/transferencias'>
            <a>Transferencias</a>
            </Link>
          </li>
        </ul>

        <div className="flex flex-wrap flex-col flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
          <span className="text-xs text-green-500 text-center">nueva base de datos desde el 18 de enero del 2023</span>
          <div className="text-xl text-slate-600">Usuarios registrados: <span className="font-bold text-green-700">{props?.users}</span></div>
          <div className="text-xl pt-3 text-slate-600">Numeros Comprados: <span className="font-bold text-green-700">{props?.numeros}</span></div>
        
        </div>
      </main>
    </div>
  );
};
export default Login;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  var {data} = session ? await axios.get(`${process.env.NEXTAUTH_URL}/api/datos/perfil/${session.user.email}`) : ({data:null});
  if(data?.docs?.[0]?.email != 'mismonedasbtc@gmail.com' &&
    data?.docs?.[0]?.email != 'geylerps@gmail.com'){
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  var {data: datos} = session ? await axios.get(`${process.env.NEXTAUTH_URL}/api/datos/admin/estadisticas/inicio`) : ({data:null});
  
  var users = await datos?.users?.totalDocs ? datos?.users?.totalDocs : 0;
  var numeros = await datos?.numeros?.totalDocs ? datos?.numeros?.totalDocs : 0;

  return {
    props: {users, numeros},
  };
};


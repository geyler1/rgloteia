import Head from "next/head";
import Footer from "../componentes/footer";
import Header from "../componentes/header";
import { getSession } from 'next-auth/react'
import resultadosdeldia from '/datos/resultadosdeldia'
import historialderesultados from '/datos/historialderesultados'
import translate from '@vitalets/google-translate-api';
import Resultadosdeldia from "componentes/resultadosdeldia/resultadosdeldia";
import HistorialCorto from "componentes/historial/historialcorto";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import SliderGanadores from "componentes/sliderGanadores";

export default function Home(props) {
  const [editarBillet, setEditarBillet] = useState(false);
  const [victoria, setVictoria] = useState(false);
  const esReferido = async (x) => {
    if(props.datos?.[0]?._id){
      setVictoria(true);
      setEditarBillet(true)
    }
    if (typeof(Storage) !== "undefined") {
      if(!localStorage.getItem("refLoteria")){
        localStorage.setItem("refLoteria", x);
      }
  }}
  useEffect(() => {
    esReferido(props.referido);
  },[]);

  
  const lamodal2 = () => {
    if(editarBillet){
      setEditarBillet(false)
    }else{
      setEditarBillet(true)
    }
  }

  const [numerosGanadores, setNumerosGanadores] = useState(null)
  const buscarNumerosGanadores = async () => {
    var { data: numeros } = await axios.post(
      `/api/datos/admin/estadisticas/numerosGanadores`,{
        pagina: 1
      }
    );
    console.log(numeros?.users.docs)
    
    if(numeros?.users?.docs[0] != undefined){
      setNumerosGanadores(numeros?.users?.docs);
    }else{
      setNumerosGanadores(null);
    }
  };
  useEffect(() => {
    buscarNumerosGanadores()
  },[])

  return (
      <div className="bg-slate-100">
      <Head>
        <meta name="googlebot" content="notranslate"/>
        <meta httpEquiv='Content-Language' content='es'/>
        <meta name='distribution' content='global'/>

        <title>★ Jugar La bolita | La mejor Lotería online | RGLOTERIA</title>
        <meta name="description" 
        content="Jugar la lotería | Resultados de la lotería | La mejor lotería para jugar la bolita online, Altas probabilidades de ganar | RGLOTERIA.COM" />
        <link rel="icon" href="/favicon.ico" />
        
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="max-image-preview:large" />
        <meta property="image" content="/logoFull.jpeg" />
        <meta property="og:image" content="/logoFull.jpeg" />
        <meta name="twitter:image" content="/logoFull.jpeg"/>
        <link href="/logoFull.jpeg" rel="image_src"/>
        <meta property="image:width" content="1000" />
        <meta property="image:height" content="1000" />
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="1000" />
        
      </Head>

      <div className="w-full">
        <Header perfil={props.session ? props.session.user : ''} saldo={props?.data?.docs[0].saldo}/>
        <main className="w-full max-w-3xl mx-auto my-6">
          
          {
            props.urlAdmin != ''?(
              <>
              <span className="text-slate-400 px-3">Solo visible para el Administrador</span><br/>
              <li className={`px-5 m-3 py-2 inline-block text-base relative bg-slate-700 border-2 border-transparent hover:bg-black text-white rounded-full mr-3`}>
                <Link href={`/${props.urlAdmin}`}>
                <a>{props.urlAdmin}</a>
                </Link>
              </li>
              </>
            ):''
          }
          {
            numerosGanadores?(
              <div className="fixed bottom-0 px-3 z-50 block w-full max-w-3xl">
                <SliderGanadores data={numerosGanadores} />
              </div>
            ):''
          }

          <div className='flex justify-center items-start flex-wrap w-full'>
            <Resultadosdeldia datos={props.resultado ? props.resultado : ''} />

            <div className="imagen-promo mt-2">
              <Link href='/referidos'>
                <a>
                <Image
                src='/banner-referidos.png'
                alt="moneda"
                width={748}
                height={158}
              />
                </a>
              </Link>
            </div>
          </div>

          <>
            <HistorialCorto datos={props.historial[0] ? props.historial[0] : ''}/>
          </>

        </main>
        <Footer />
      </div>

      {
        victoria ? (
        <div className={`w-screen h-screen block fixed z-20 top-0 left-0 backdrop-blur-sm overflow-y-scroll bg-black bg-opacity-50 ${editarBillet ? '' : 'hidden'}`}>
            <div className="relative max-w-3xl mx-auto">
              <div className="text-slate-700 text-base z-20 w-10 h-10 border-2 absolute top-9 right-6 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer flex justify-center items-center" 
              onClick={lamodal2}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>

            <div className="shadow bg-white rounded-xl mb-16 mt-6 h-max max-w-3xl mx-3 md:mx-auto overflow-hidden">
              <div className="bg-[url('/confetis.gif')] bg-cover bg-no-repeat px-3 py-6">
                  <h3 className="text-2xl text-amber-400 font-bold text-center">¡VICTORIA!</h3>  
                  
                  <p className="font-semibold text-lg text-slate-700 text-center mt-8">
                  ¡Usted ganó el sorteo {props.datos?.[0]?.sorteo == 1? 'del mediodia' : 'de la noche'} el día{' '} 
                  {props.datos?.[0]?.fecha} con una apuesta de {props.datos?.[0]?.saldo} fichas 
                  al número {props.datos?.[0]?.numero} y como premio mayor gano {props.datos?.[0]?.saldo * 50} fichas!</p>

                  {
                    props.datos?.[1] ? (<p className="font-semibold text-lg text-slate-700 text-center mt-8">
                    ¡Usted ganó el sorteo {props.datos?.[1]?.sorteo == 1? 'del mediodia' : 'de la noche'} el día{' '} 
                    {props.datos?.[1]?.fecha} con una apuesta de {props.datos?.[1]?.saldo} fichas 
                    al número {props.datos?.[1]?.numero} y como premio mayor gano {props.datos?.[1]?.saldo * 50} fichas!</p>):''
                  } 
                                          
                  <p className="font-semibold text-lg text-slate-700 text-center mt-8">
                  Las fichas ganadas se agregaron a su saldo principal, también puede ver el registro de la 
                  transferencia del premio en su historial de transferencias, al igual que el número ganador 
                  quedara en su historial de jugadas.</p> 
              </div>
            </div>
        </div>
        ):''
      }
      

    </div>
  );
};

export async function getServerSideProps(context) {

  const referido = await context?.query?.r ? context?.query?.r : ''

  const session = await getSession(context)
  const resultados = await resultadosdeldia();
  const historial = await historialderesultados();

  let medFecha = await translate(resultados[0].medFecha, {to: 'es'}).then(async res => {
    return res.text
  }).catch(err => {
      console.error(err);
  });
  let nocFecha = await translate(resultados[0].nocFecha, {to: 'es'}).then(async res => {
    return res.text
  }).catch(err => {
      console.error(err);
  });

  const resultado = [medFecha, nocFecha, resultados]
  var {data} = session ? await axios.get(`${process.env.NEXTAUTH_URL}/api/datos/perfil/${session.user.email}`) : ({data:null});

  if(!data?.docs?.[0].referido && referido){
    await axios.post(`${process.env.NEXTAUTH_URL}/api/datos/admin/referidos/referidos`,{
      uid:data?.docs?.[0]._id,
      referido
    })
  }

  // SI NO TIENE NOMMBRE DE USUARIO AGREGARLO Y AGREGAR SALDO 0
  const username = await data?.docs?.[0].username;
  const id = await data?.docs?.[0]._id;
  const AgregarDatosPerfil = async () => {
    if(id){
      await axios.put(`${process.env.NEXTAUTH_URL}/api/datos/actuser/${id}`);
    }
  };
  if(!username && id){
    AgregarDatosPerfil()
  }

  // VERIFICAR GANADOR
  var {data: datos} = session ? await axios.post(`${process.env.NEXTAUTH_URL}/api/datos/verificarGanador/verHistorial`,{
    email: data?.docs?.[0]?.email,
    id: data?.docs?.[0]?._id,
  }) : ({data:null});

  // SI GANO AGREGAR SALDO
  console.log('datos en 0.id')
  console.log(datos)

  if(datos?.[0]?._id){
    var ldatos = await axios.post(`${process.env.NEXTAUTH_URL}/api/datos/actPerfilGanador/actPerfilGanador`,{
      _id: data?.docs?.[0]?._id,
      id1: datos?.[0]?._id,
      id2: datos?.[1]?._id,
      saldo1: datos?.[0]?.saldo,
      saldo2: datos?.[1]?.saldo,
    })
  }
  console.log('datos finales')
  console.log(ldatos)

  var urlAdmin = ''
  if(data?.docs?.[0]?.email != 'mismonedasbtc@gmail.com' &&
  data?.docs?.[0]?.email != 'geylerps@gmail.com'){
    var urlAdmin = ''
  }else{
    var urlAdmin = '4dm1n1str4c10n'
  }

  return {
    props: {resultado , historial, session, referido, data, datos, urlAdmin}
  };
}
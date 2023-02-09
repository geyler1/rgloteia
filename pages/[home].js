import Head from "next/head";
import Footer from "../componentes/footer";
import Header from "../componentes/header";
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Historial from "componentes/historial/historial";
import historialcompleto from '/datos/historialcompleto';
import HistorialJuego from 'componentes/HostorialJuego'
import { useState, useEffect } from "react";
import tronTRX from '/datos/tronTRX';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

import Perfil from "componentes/perfil";
import Recargar from "componentes/recargar";
import RecargarMultiMonedas from 'componentes/recargarMultiMonedas'


import axios from "axios";
import Referidos from "componentes/referidos";
import Charada from "componentes/charada";
import Transferencias from "componentes/transferencias";

import horas from 'datos/horasUTC'
import Retirar from "componentes/retirar";

export default function Homex(props) {
  const laUrl = props.context.home;

  const [editarBillet, setEditarBillet] = useState(false);
  const [victoria, setVictoria] = useState(false);
  const esReferido = async () => {
    if(props.datos?.[0]?._id){
      setVictoria(true);
      setEditarBillet(true)
    }}
  useEffect(() => {
    esReferido();
  },[]);

  const lamodal2 = () => {
    if(editarBillet){
      setEditarBillet(false)
    }else{
      setEditarBillet(true)
    }
  }


  return (
    <div className="bg-slate-100">
      <Head>
        <meta name="googlebot" content="notranslate"/>
        <meta httpEquiv='Content-Language' content='es'/>
        <meta name='distribution' content='global'/>
        <title>RGLOTERIA</title>
        <meta name="description" content="Juegos y Apuestas | RGLOTERIA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen flex-wrap">
        <Header perfil={props.session ? props.session.user : ''} saldo={props?.data?.docs[0].saldo}/>
        <main className="w-full max-w-3xl mx-auto">

          {laUrl == 'charada' ? (
              <>
              <Charada/>
              </>
            ) : ''}

          {laUrl == 'historial' ? (
              <>
              <Historial datos={props.historial[0] ? props.historial[0] : ''}/>
              </>
            ) : ''}

          {laUrl == 'historial-de-juego' ? (
              <>
              <HistorialJuego id={props?.data?.docs[0]._id ? props?.data?.docs[0]._id : props?.id}
                email={props?.data?.docs?.[0]?.email}
                pagina={props?.pagina} urlBase={props?.urlBase}/>
              </>
            ) : ''}  

          {laUrl == 'perfil' ? (
              <>
              <Perfil datos={props.session ? props.session : ''} 
              saldo={props?.data?.docs[0].saldo} 
              username={props?.data?.docs[0].username ? props?.data?.docs[0].username : props?.id}
              id={props?.data?.docs[0]._id ? props?.data?.docs[0]._id : props?.id}  
              billetera={props?.data?.docs[0].billetera ? props?.data?.docs[0].billetera : ''}
              email={props?.data?.docs?.[0]?.email}
              tarjeta={props?.data?.docs[0].tarjetaCUP}/>
              </>
            ) : ''}

          {laUrl == 'recargar' ? (
              <>
                {/*<Recargar precios={props?.precio} saldo={props?.data?.docs[0].saldo}
                billetera={props?.data?.docs[0].billetera ? props?.data?.docs[0].billetera : ''}
                uid={props?.data?.docs[0]._id ? props?.data?.docs[0]._id : ''}
                email={props?.data?.docs[0].email ? props?.data?.docs[0].email : ''}
                referido={props?.data?.docs[0].referido ? props?.data?.docs[0].referido : ''}/>*/}
                <RecargarMultiMonedas precios={props?.precio} saldo={props?.data?.docs[0].saldo}
                billetera={props?.data?.docs[0].billetera ? props?.data?.docs[0].billetera : ''}
                uid={props?.data?.docs[0]._id ? props?.data?.docs[0]._id : ''}
                email={props?.data?.docs[0].email ? props?.data?.docs[0].email : ''}
                referido={props?.data?.docs[0].referido ? props?.data?.docs[0].referido : ''}
                tarjeta={props?.data?.docs[0].tarjetaCUP}/>
              </>
            ) : ''}

          {laUrl == 'referidos' ? (
              <>
                <Referidos datos={props.docs}
                username={props?.data?.docs[0].username ? props?.data?.docs[0].username : props?.id}
                uid={props?.data?.docs[0]._id ? props?.data?.docs[0]._id : ''}/>
              </>
            ) : ''}  
          
          {laUrl == 'transferencias' ? (
              <>
                <Transferencias username={props?.data?.docs[0].username ? props?.data?.docs[0].username : props?.id}
                uid={props?.data?.docs[0]._id ? props?.data?.docs[0]._id : ''}
                saldo={props?.data?.docs[0].saldo}/>
              </>
            ) : ''} 
            {laUrl == 'retirar' ? (
              <>
                <Retirar saldo={props?.data?.docs[0].saldo} uid={props?.data?.docs[0]._id}/>
              </>
            ) : ''} 

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

        </main>
        <Footer />
      </div>
    </div>
  );
}

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
  if (
    context.query.home != "historial" &&
    context.query.home != "perfil" &&
    context.query.home != "charada" &&
    context.query.home != "recargar" &&
    context.query.home != "referidos" &&
    context.query.home != "transferencias" &&
    context.query.home != "historial-de-juego" &&
    context.query.home != "retirar" 
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  var historial = ''
  if(context.query.home == "historial"){
    var historial = await historialcompleto();
  }


  var precioTRON = ''
  if(context.query.home == "recargar"){
    //var TRON = await tronTRX()
    //var precioTRON = TRON
  }
  
var {data} = session ? await axios.get(`${process.env.NEXTAUTH_URL}/api/datos/perfil/${session.user.email}`) : ({data:null});

var datos = ''
if(context.query.home == "historial-de-juego"){
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
}

const id = await data?.docs[0]._id
var {data: docs} = context.query.home == "referidos" ? await axios.get(`${process.env.NEXTAUTH_URL}/api/datos/referidos/${id}`) : ({data:null});

const pagina = context?.query?.pag?context?.query?.pag:1;
const urlBase = context?.query?.home

return {
    props: {
      session,
      context: context.query,
      historial,
      data,
      id,
      docs,
      pagina,
      urlBase,
      datos
    },
  };
};
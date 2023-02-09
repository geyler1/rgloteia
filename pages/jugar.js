import Head from "next/head";
import Footer from "../componentes/footer";
import Header from "../componentes/header";
import { getSession } from 'next-auth/react'
import axios from "axios";
import Numeros from "componentes/numeros";
import JugadosHoy from 'componentes/JugadosHoy'
import HorasUTC from "datos/horasUTC";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function Home(props) {
  const horasUTC = HorasUTC();
  const [horas, setHoras] = useState();
  const [minutos, setMinutos] = useState();
  const [segundos, setSegundos] = useState();

  const Reloj = () => {
    let momentoActual = new Date();
    let hora = momentoActual.getHours();
    hora = `${hora<=9?'0':''}${hora}`;
    let minuto = momentoActual.getMinutes();
    minuto = `${minuto<=9?'0':''}${minuto}`;
    let segundo = momentoActual.getSeconds();
    segundo = `${segundo<=9?'0':''}${segundo}`;
    setHoras(hora);
    setMinutos(minuto);
    setSegundos(segundo);
    setTimeout(Reloj,1000);
  }
  useEffect(()=>{
    Reloj()
  },[]);

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

      <div className="w-full">
        <Header perfil={props.session ? props.session.user : ''} saldo={props?.data?.docs[0].saldo}/>
        <main className="w-full max-w-3xl mx-auto my-6">

          <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
            <h3 className="pb-3 text-current text-2xl w-full font-semibold">Sección de juego</h3>
            <p className="text-base text-slate-700 pb-2">En esta sección puedes comprar tus números para los próximos sorteos.
            <a className="text-sky-700 font-semibold" href="#info"> Aquí puedes leer más sobre los sorteos diarios.</a></p>
            
            <div className="flex items-center">
            <span className="text-xl font-semibold text-slate-700 mr-1"><FontAwesomeIcon icon={faClock}/></span>
            <span className="text-xl font-semibold text-slate-700">{horas}</span>
            <span className="text-xl font-semibold text-slate-700">:</span>
            <span className="text-xl font-semibold text-slate-700">{minutos}</span>
            <span className="text-xl font-semibold text-slate-700">:</span>
            <span className="text-xl font-semibold text-slate-700">{segundos}</span>
            </div>
            
          </div>

          <div className="">
            <Numeros saldo={props?.data?.docs[0].saldo} id={props?.data?.docs[0]._id} />
          </div>

          <div className="">
            <JugadosHoy id={props?.data?.docs[0]._id}/>
          </div>

          <div id='info' className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
            <h3 className="text-current text-2xl w-full font-semibold">Información sobre los sorteos</h3>
            <p className="text-base text-slate-700">Tanto en el sorteo del mediodía, como en el sorteo de la noche, 
            puedes comprar tantos números como puedas, porque los números tienen un límite, así que apresurate en comprar 
            o alguien más se llevara todas las unidades de tu número favorito. <br/><br/>
            Cuando compres algún número aparecerá de inmediato en el historial de juego, ahí se guardara cada jugada 
            que realices, y podrás ver cuantas veces has ganado. <br/><br/>
            Si ganas en algún sorteo, en cuanto entres a la web te avisaremos, también lo podrás ver después en 
            el historial de jugadas y la transferencia con la recompensa aparcera en el historial de transferencias.</p>
            <h3 className="pb-3 pt-5 text-current text-2xl w-full font-semibold">Sorteo del mediodía</h3>
            <p className="text-base text-slate-700">El sorteo del mediodía esta disponible a partir de las {horasUTC.horaInicianSorteos} horas, 
            y a las {horasUTC.horaSaleMediodia} horas se da a conocer el resultado, pero solo se puede jugar hasta 1 hora antes 
            de darse a conocer el resultado.</p>
            <h3 className="pb-3 pt-5 text-current text-2xl w-full font-semibold">Sorteo de la noche</h3>
            <p className="text-base text-slate-700">El sorteo de la noche está disponible a partir de las {horasUTC.horaInicianSorteos} horas, 
            y a las {horasUTC.horaSaleNoche} horas se da a conocer el resultado, pero solo se puede jugar hasta 3 hora antes de darse a 
            conocer el resultado.</p>
          </div>    

        </main>
        <Footer />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  var {data} = session ? await axios.get(`${process.env.NEXTAUTH_URL}/api/datos/perfil/${session.user.email}`) : ({data:null});
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {session, data}
  };
}
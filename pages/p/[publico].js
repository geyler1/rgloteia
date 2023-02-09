import Head from "next/head";
import Footer from "componentes/footer";
import Header from "componentes/header";
import { getSession } from 'next-auth/react'
import axios from "axios";
import Ayuda from "componentes/tutorialAyuda";

export default function Homex(props) {
  const laUrl = props.context.publico;

  return (
    <div className="bg-slate-100">
      <Head>
        <title>RGLOTERIA</title>
        <meta name="description" content="Juegos y Apuestas | RGLOTERIA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen flex-wrap">
        <Header perfil={props.session ? props.session.user : ''} saldo={props?.data?.docs[0].saldo}/>
        <main className="w-full max-w-3xl mx-auto">

          {laUrl == 'ayuda' ? (
              <>
              <Ayuda/>
              </>
            ) : ''}

        </main>
        <Footer />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (
    context.query.publico != "ayuda" 
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  
var {data} = session ? await axios.get(`${process.env.NEXTAUTH_URL}/api/datos/perfil/${session.user.email}`) : ({data:null});

return {
    props: {
      session,
      context: context.query,
      data,
    },
  };
};
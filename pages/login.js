import { signIn, getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  return (
    <div className="bg-slate-100 w-screen h-screen flex justify-center items-center flex-wrap min-w-full">
      <Head>
        <meta name="googlebot" content="notranslate"/>
        <meta httpEquiv='Content-Language' content='es'/>
        <meta name='distribution' content='global'/>
        <title>RGLOTERIA</title>
        <meta name="description" content="Juegos y Apuestas | RGLOTERIA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-52 fixed top-0 left-0 z-0 bg-[url('/fondo.png')] bg-cover md:bg-center md:h-96"></div>

      <main className="w-full p-3 mx-auto box-border max-w-sm mb-32 z-20">
        <div className="w-full p-3 bg-white rounded-xl shadow box-border overflow-hidden min-w-full ">
          <div className="flex justify-center items-center mt-5 mb-4">
            <Image src="/logologin.png" alt="Logo" width={120} height={60} />
          </div>
          <button
            onClick={() => signIn("google")}
            className="flex text-base my-3 py-2 rounded-full justify-center w-full mt-5 items-center
              mx-auto font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white">
            <Image src="/google.png" alt="Google" width={18} height={18} />
            <span className="ml-2">Acceder con Google</span>
          </button>
          <div className="flex justify-center">
            <Link href="/">
              <a className="mt-3 mb-5 text-slate-600 text-base hover:text-slate-800 underline">
                Cancelar y volver al Inicio.
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Login;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {
    props: {},
  };
};

import Link from "next/link";

const Footer = function () {
  return (
    <footer className="px-3 pt-6 py-4 bg-gradient-to-br from-slate-900 to-slate-700 ">
      <p className="text-center text-base px-0 pt-0 pb-3 m-0">
        +18 PROHIBIDO PARA MENORES DE EDAD.
      </p>

      
     {/* <ul className="flex flex-wrap justify-center">
        <li className="p-2">
          <Link href="/p/ayuda">
            <a className="flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
              text-slate-50 hover:text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition">
              Ayuda
            </a>
          </Link>
        </li>
        <li className="p-2">
          <Link href="/p/terminos-y-condiciones">
            <a className="flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
              text-slate-50 hover:text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition">
              Términos y Condiciones
            </a>
          </Link>
        </li>
      </ul>*/}
      

      <p className="text-center text-base px-0 py-3 m-0">
        © 2022{" "}
        <Link href="/">
          <a>RGLOTERIA</a>
        </Link>
        , Todos los derechos reservados.
      </p>
      <div className="py-8"></div>
    </footer>
  );
};
export default Footer;

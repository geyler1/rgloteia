import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";

const Paginado = function (p) {

  const prevUrl = `/${p?.urlBase}/?pag=${p.prevPage}`;
  const nextUrl = `/${p?.urlBase}/?pag=${p.nextPage}`;

  return (
    <div className="flex pt-5 w-full">
      {p.prevPage || p.nextPage ? (<ul className="flex justify-center mx-auto max-w-sm w-full">
        {p.prevPage ? (
          <li className="w-1/2 pr-2 flex">
            <Link href={prevUrl}>
              <a className="rounded-full flex w-full justify-center items-center text-center px-5 bg-slate-700 hover:bg-black text-white transition-all p-2 text-base"
              ><FontAwesomeIcon icon={faAngleLeft} className='mr-2'/> Anterior</a>
            </Link>
          </li>
        ) : (
          <li className="w-1/2 pr-2 flex">
            <Link href={`#`}>
              <a className="rounded-full flex w-full justify-center items-center text-center px-5 bg-slate-300 text-white p-2 text-base cursor-not-allowed"
              ><FontAwesomeIcon icon={faAngleLeft} className='mr-2'/> Anterior</a>
            </Link>
          </li>
        )}
        
        {p.nextPage ? (
          <li className="w-1/2 pl-2 flex">
            <Link href={nextUrl}>
              <a className="rounded-full flex w-full justify-center items-center text-center px-5 bg-slate-700 hover:bg-black text-white transition-all p-2 text-base"
              >Siguiente <FontAwesomeIcon icon={faAngleRight} className='ml-2'/></a>
            </Link>
          </li>
        ) : (
          <li className="w-1/2 pl-2 flex">
            <Link href={`#`}>
              <a className="rounded-full flex w-full justify-center items-center text-center px-5 bg-slate-300 text-white p-2 text-base cursor-not-allowed"
              >Siguiente <FontAwesomeIcon icon={faAngleRight} className='ml-2'/></a>
            </Link>
          </li>
        )}
      </ul>) : ''
      }
    </div>
  );
};
export default Paginado;
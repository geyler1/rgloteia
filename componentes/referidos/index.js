import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import copy from "copy-to-clipboard"; 

const Referidos = function (props) {

  const copyToClipboard2 = () => {
    copy(`https://rgloteria.com/?r=${props.uid}`);
    copyAlert()
  }
  
  const [copyText, setCopyText] = useState(false);
  const copyAlert = () => {
    setCopyText(true)
    setTimeout(()=>{setCopyText(false)}, 2500)
  }
  return (
    <>
    {
      copyText ? (
        <div className="fixed top-0 left-0 w-screen max-w-full z-50 ">
          <div className="relative w-full max-w-3xl mx-auto">
            <span className="p-3 mt-6 mr-3 absolute right-0 top-0 bg-green-500 text-slate-50 rounded-xl shadow">
              Copiado a bandeja de clip
            </span>
          </div>
        </div>
      ) : ''
    }
    <div>
      {
        props?.datos?.docs[0]?.email ? (
          <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
            <ul className="w-full">
              <li className="flex flex-wrap">
                <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold">Mis referidos</h3>
                <span className="text-base text-slate-600 w-full">
                  Usted recibirá el <b>5%</b> de las fichas que sus referidos compren en su primera recarga.<br/>
                  Sus referidos aparecerán aquí después de realizar su primera compra.
                </span>

                <div className="flex items-center flex-initial flex-wrap mt-3 border-b border-slate-200 pb-5 w-full justify-between sm:justify-start">
                  <span className="text-slate-600 text-base w-full">Link de referido:</span><br/>
                  <span className="text-base font-bold pr-3 w-5/6 md:w-1/2 line-clamp-1">
                  https://rgloteria.com/?r={props.uid}</span>
                  <div className="text-sm text-slate-700 border-2 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer" 
                    onClick={copyToClipboard2}>
                    <FontAwesomeIcon icon={faCopy} />
                  </div>
                </div>
              </li>
              {props?.datos?.docs.map((user) => (
                  <li key={user._id}>
                    <div className="flex justify-between items-center py-4 border-b border-slate-200">
                      <div className="flex justify-start items-start w-2/3 overflow-hidden">
                        <div className="w-11 h-11 overflow-hidden">
                          <Image
                            src={user.image}
                            alt="moneda"
                            width={44}
                            height={44}
                          />
                        </div>
                        <div className="flex flex-col ml-3 w-2/3 overflow-hidden">
                          <span className="text-current text-slate-700">{user.name}</span>
                          <span className="text-current text-slate-700 font-semibold">@{user.username}</span>
                        </div>
                      </div>

                      <div className="flex justify-center text-amber-400 font-bold items-center text-xl">
                        <span className="w-5 h-5 mr-1">
                          <Image src="/moneda.svg" alt="moneda" width={20} height={20} />
                        </span>
                        <span>{user?.donado ? user?.donado : 0}</span>
                      </div>
                    </div>
                  </li> ))
              }
            </ul>
          </div>
        ) : (
          <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
            <ul className="w-full">
              <li className="flex flex-wrap">
                <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold">Mis referidos</h3>
                <span className="text-base text-slate-600 w-full">
                  Usted recibirá el <b>5%</b> de las fichas que sus referidos compren en su primera recarga.
                </span>
                <span className="text-base text-slate-600 w-full">
                  Todavía no tienes ningún referido! Puedes invitar a tus amigos con el siguiente link.
                </span>
                <div className="flex items-center flex-initial flex-wrap mt-3 pb-3 w-full justify-between sm:justify-start">
                  <span className="text-slate-600 text-base w-full">Link de referido:</span><br/>
                  <span className="text-base font-bold pr-3 w-5/6 md:w-1/2 line-clamp-1">
                  https://rgloteria.com/?r={props.uid}</span>
                  <div className="text-sm text-slate-700 border-2 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer" 
                    onClick={copyToClipboard2}>
                    <FontAwesomeIcon icon={faCopy} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )
      }
    </div>
    </>
  );
};
export default Referidos;
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
const Resultadosdeldia = (props) => {
  const [losJugados, setLosJugados] = useState();

  const comprasHoy = async () => {
    var { data: recargasEnvx } = await axios.get(
      `/api/datos/jugadosHoy/${props.id}`
    );
    if(recargasEnvx.docs[0] != undefined){
      setLosJugados(recargasEnvx.docs);
    }else{
      setLosJugados(null);
    }
  };
  useEffect(() => {
    comprasHoy();
  }, []);

  return (
    <>

      {losJugados ? (
        <div>
          <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
            <h3 className="text-2xl text-current m-0 pb-5 w-full font-semibold">Últimos 10 números comprados hoy</h3>
            <ul className="w-full flex flex-wrap ">
            {losJugados?.map((user) => (
              <li key={user._id} className='w-full'>
                <div className="flex justify-between items-center py-4 border-b border-slate-200">
                  <div className="flex justify-start items-center w-2/3 overflow-hidden">
                    <div className="flex w-12 h-12 items-center">
                      <span className="border-2 w-11 h-11 rounded-full shadow bg-gradient-to-br from-white to-amber-50 border-slate-200
                        font-bold text-xl text-slate-700 flex items-center justify-center">{user?.numero}</span>
                    </div>
                    <div className="flex flex-col ml-3 w-2/3 overflow-hidden">
                      <span className="text-current text-slate-700">{`${user?.fecha} ${user?.hora}`}</span>
                      <span className="text-current text-slate-700 font-semibold">
                        {user?.sorteo == 1 ? "Mediodía" : "Noche"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center text-amber-400 font-bold items-center text-xl">
                    <span className="w-5 h-5 mr-1">
                      <Image
                        src="/moneda.svg"
                        alt="moneda"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span>{user?.saldo}</span>
                  </div>
                </div>
              </li>
            ))}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Resultadosdeldia;

import Image from "next/image";

const CardRecargar = function (props) {
  return (
    <div className="flex flex-col cursor-pointer bg-white shadow hover:shadow-md rounded-xl w-full h-56 justify-start items-center box-border overflow-hidden">
      <div></div>
      <div className="flex flex-col justify-between inherit items-center">
        <div className="flex justify-center items-center font-bold text-xl text-current pt-5">
          <Image src="/moneda.svg" alt="moneda" width={20} height={20} />
          <span className="card-recargar-cantidad">{props.cantidadMonedas}</span>
        </div>
        <div>
          <Image
            src={props.imagen}
            alt="Fichas"
            width={72}
            height={72}
          />
        </div>
        <div className="flex flex-wrap flex-col pb-5 justify-center items-center">
          <span className="text-current font-bold text-base pb-1">{props.precio}</span>
          <span className="text-slate-400 line-through text-sm font-bold">{props.precioOriginal}</span>
        </div>
      </div>
      <div className="relative w-full">
        {
          props.popular? (
            <>
              <div className="absolute bottom-0 left-0"><Image src='/estrellas-left.png' alt="Fichas" width={71} height={82}/></div>
              <div className="absolute bottom-0 right-0"><Image src='/estrellas-right.png' alt="Fichas" width={71} height={82}/></div>
              <span className="flex text-center justify-center items-center text-slate-100 text-sm 
              p-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700">Popular</span>
            </>
          ): ''
        }
      </div>
    </div>
  );
};
export default CardRecargar;

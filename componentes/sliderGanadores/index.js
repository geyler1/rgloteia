import React, { useState, useEffect } from 'react';

function SliderGanadores(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % props.data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, props.data.length]);

  const currentItem = props.data[currentIndex];
  return (
    <div className='text-white bg-slate-700 text-xs p-3 rounded-t-xl w-full text-center'>
      {`El usuario ${currentItem?.name ? currentItem?.name : currentItem?.id} apostó ${currentItem?.saldo} fichas al número ${currentItem?.numero} para el sorteo ${parseInt(currentItem?.sorteo) === 1 ? 'del mediodía' : 'de la noche'} del ${currentItem?.fecha} y ganó ${currentItem?.saldo * 50} fichas.`}
    </div>
  );
}

export default SliderGanadores;

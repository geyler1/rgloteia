const BolaBoton = function (props) {
  var num = props.num.toString()
  var cero = num.length <= 1 ? '0' : ''
  return(
    <div className="border-2 m-1 rounded-full shadow bg-gradient-to-br from-white to-amber-50 border-slate-200 p-3
       font-bold text-3xl text-slate-700 cursor-pointer hover:from-white hover:to-amber-200 hover:shadow-md transition-all
       duration-300">{`${cero}${props.num}`}
    </div>
  )
}
export default BolaBoton;
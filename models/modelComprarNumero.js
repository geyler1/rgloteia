import { Schema, model, models } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const modelComprarNumero = new Schema({
  id: {
    type: String,
  },
  saldo: {
    type: Number,
  },
  saldoGanado: {
    type: Number,
  },
  numero: {
    type: String,
  },
  name: {
    type: String,
  },
  unidades: {
    type: Number,
  },
  fecha: {
    type: String,
  },
  hora: {
    type: String,
  },
  victoria: {
    type: Boolean,
  },
  checked: {
    type: Boolean,
  },
  sorteo: {
    type: String,
  },
  email: {
    type: String,
  },
}, {
  timestamps: true
});

modelComprarNumero.plugin(mongoosePaginate);

const comprarNumeros = models.comprarNumeros || model('comprarNumeros', modelComprarNumero);

export default comprarNumeros;
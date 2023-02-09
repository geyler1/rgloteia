import { Schema, model, models } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const modelRecargas = new Schema({
  uid: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
  },
  fichas: { 
    type: Number,
  },
  referido: {
    type: String,
  },
  billetera: {
    type: String,
  },
  tarjetaCUP: {
    type: String,
  },
  saldoCrypto: {
    type: String,
  },
  saldo: {
    type: Number,
  },
  pendiente: {
    type: Boolean,
  }
}, {
  timestamps: true
});

modelRecargas.plugin(mongoosePaginate);

const recargas = models.recargas || model('recargas', modelRecargas);

export default recargas;
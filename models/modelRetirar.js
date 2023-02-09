import { Schema, model, models } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const modelRetirar = new Schema({
  uid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  billetera: {
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

modelRetirar.plugin(mongoosePaginate);

const retirar = models.retirar || model('retirar', modelRetirar);

export default retirar;
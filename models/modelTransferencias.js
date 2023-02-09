import { Schema, model, models } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const modelTransferencias = new Schema({
  envia: {
    type: String,
  },
  recibe: {
    type: String,
  },
  saldo: {
    type: Number,
  },
  fotoEnvia: {
    type: String,
  },
  fotoRecibe: {
    type: String,
  },
  nombreEnvia: {
    type: String,
  },
  nombreRecibe: {
    type: String,
  },
  usernameEnvia: {
    type: String,
  },
  usernameRecibe: {
    type: String,
  },
}, {
  timestamps: true
});

modelTransferencias.plugin(mongoosePaginate);

const transfers = models.transfers || model('transfers', modelTransferencias);

export default transfers;
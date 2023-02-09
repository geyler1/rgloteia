import { Schema, model, models } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const modelPerfil = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  saldo: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  linkReferido: {
    type: String,
    required: true,
    unique: true,
  },
  billetera: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true
});

modelPerfil.plugin(mongoosePaginate);

const MPerfils = models.MPerfils || model('MPerfils', modelPerfil);

export default MPerfils;
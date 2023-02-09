import { Schema, model, models } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const modelUsers = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  saldo: {
    type: Number,
  },
  emailVerified: {
    type: Boolean,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  referido: {
    type: String,
  },
  recarga: {
    type: Boolean,
  },
  donado: {
    type: String,
  },
  billetera: {
    type: String,
  },
  tarjetaCUP: {
    type: String,
  },
  telefono: {
    type: String,
  },
}, {
  timestamps: true
});

modelUsers.plugin(mongoosePaginate);

const users = models.users || model('users', modelUsers);

export default users;
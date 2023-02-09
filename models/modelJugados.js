import { Schema, model, models } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const modelJugados = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  saldo: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

modelJugados.plugin(mongoosePaginate);

const MJugados = models.MJugados || model('MJugados', modelJugados);

export default MJugados;
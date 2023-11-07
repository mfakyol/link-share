import config from '../config';
import mongoose, { ConnectOptions } from 'mongoose';

export function connectDB() {
  return mongoose
    .connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => console.log('[mongoose]: Connected to DB.'))
    .catch((e) => console.log(e));
}

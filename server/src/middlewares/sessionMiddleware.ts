import config from '../config';
import session from 'express-session';
import MongoStore from 'connect-mongo';

export default function () {
  const maxAge = 365 * 24 * 60 * 60 * 1000; // one year
 

  return session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: config.MONGO_URI
    }),
    cookie: {
      maxAge,
      sameSite: false,
      httpOnly: true,
      secure:config.BUILD == "production",
    },
  });
}

import cors from 'cors';
import helmet from 'helmet';
import config from './config';
import express from 'express';
import AppRouters from './routes';
import { connectDB } from './utils/db';
import http, { Server as HTTPServer } from 'http';
import https, { Server as HTTPSServer } from 'https';
import sessionMiddleware from './middlewares/sessionMiddleware';

async function startServer() {
  connectDB();
  const app = express();
  const session = sessionMiddleware();
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  app.use(express.static('public'));
  app.use(helmet());
  app.use(session);
  AppRouters(app);

  let server: HTTPServer | HTTPSServer;

  if (config.PROTOCOL == 'https') {
    const options = {
      host: config.HOST,
      // key,
      // cert,
      requestCert: true,
      rejectUnauthorized: config.BUILD == 'production',
    };
    server = https.createServer(options, app);
  } else {
    server = http.createServer(app);
  }

  server.listen(config.PORT, () => {
    console.log(`[server] runnig at ${config.PROTOCOL}://localhost:${config.PORT}`);
  });
}

startServer();

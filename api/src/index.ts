import { ApiModule } from './lib/api.module';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as functions from 'firebase-functions';
import * as cookieParser from 'cookie-parser';

export * from './lib/index';

const expressServer = express();

const createFunction = async (
  expressInstance: express.Express
): Promise<void> => {
  const app = await NestFactory.create(
    ApiModule,
    new ExpressAdapter(expressInstance),
    {
      cors: {
        origin: [
          'https://codelog-mc.web.app',
          'https://us-central1-codelog-mc.cloudfunctions.net',
        ],
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
        credentials: true,
      },
    }
  );
  app.use(cookieParser());
  await app.init();
};

export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});

import { ApiModule } from './lib/api.module';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as functions from 'firebase-functions';
export * from './lib/index';

const expressServer = express();

const createFunction = async (
  expressInstance: express.Express
): Promise<void> => {
  const app = await NestFactory.create(
    ApiModule,
    new ExpressAdapter(expressInstance)
  );
  await app.init();
};

export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});

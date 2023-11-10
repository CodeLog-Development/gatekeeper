import { ApiModule } from './lib/api.module';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as functions from 'firebase-functions';
import * as cookieParser from 'cookie-parser';
import {
  firebaseServiceAccount,
  freecurrencyApiKey,
  paystackSecret,
} from './lib/config/configuration';
import { ValidationPipe } from '@nestjs/common';

export * from './lib/index';

const expressServer = express();

const createFunction = async (
  expressInstance: express.Express,
): Promise<void> => {
  const app = await NestFactory.create(
    ApiModule,
    new ExpressAdapter(expressInstance),
    {
      cors: {
        origin: true,
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
      },
    },
  );
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
};

export const api = new functions.FunctionBuilder({
  regions: ['europe-west2'],
})
  .runWith({
    secrets: [firebaseServiceAccount, freecurrencyApiKey, paystackSecret],
  })
  .https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
  });

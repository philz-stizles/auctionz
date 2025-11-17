import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import { Handler } from 'aws-lambda';

const commonMiddleware = (
  handler: Handler,
  schema?: Record<string, unknown>
) => {
  let wrappedHandler = middy(handler);

  wrappedHandler = wrappedHandler
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer());

  if (schema) {
    wrappedHandler = wrappedHandler.use(
      validator({ eventSchema: transpileSchema(schema) })
    );
  }

  return wrappedHandler.use(httpErrorHandler()).use(cors());
};
// middy(handler)
//   .use(httpJsonBodyParser())
//   .use(httpEventNormalizer())
//   .use(validator({ eventSchema: transpileSchema(schema) }))
//   .use(httpErrorHandler())
//   .use(cors());

export default commonMiddleware;

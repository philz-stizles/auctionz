const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const httpEventNormalizer = require('@middy/http-event-normalizer');
const httpErrorHandler = require('@middy/http-error-handler');
const cors = require('@middy/http-cors');
const validator = require('@middy/validator');
const { transpileSchema } = require('@middy/validator/transpile');

module.exports = (handler, schema = {}) =>
  middy()
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(validator({ eventSchema: transpileSchema(schema) }))
    .use(httpErrorHandler())
    .use(cors())
    .handler(handler);

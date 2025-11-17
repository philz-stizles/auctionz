export default {
  type: 'object',
  properties: {
    body: {
      type: 'string',
      minLength: 1,
      pattern: '=$', // Check if the body value ends with an "=" sign as base64 strings often do.
    },
  },
  required: ['body'],
};

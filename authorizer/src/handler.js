const jwt = require('jsonwebtoken');

// Set in `environment` of serverless.yml
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_PUBLIC_KEY = process.env.AUTH0_CLIENT_PUBLIC_KEY;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;

// Policy helper function
// By default, API Gateway authorizations are cached (TTL) for 300 seconds.
// This policy will authorize all requests to the same API Gateway instance where the
// request is coming from, thus being efficient and optimizing costs.
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports.auth = (event, context, callback) => {
  console.log('event', event);
  if (!event.authorizationToken) {
    return callback('Unauthorized');
  }

  const tokenParts = event.authorizationToken.split(' ');
  const tokenValue = tokenParts[1];

  if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
    // no auth token!
    return callback('Unauthorized');
  }
  const options = {
    audience: AUTH0_AUDIENCE,
  };

  try {
    jwt.verify(
      tokenValue,
      AUTH0_CLIENT_PUBLIC_KEY,
      options,
      (verifyError, decoded) => {
        if (verifyError) {
          console.log('verifyError', verifyError);
          // 401 Unauthorized
          console.log(`Token invalid. ${verifyError}`);
          return callback('Unauthorized');
        }
        // is custom authorizer function
        console.log('valid from customAuthorizer', decoded);
        const policy = generatePolicy(decoded.sub, 'Allow', event.methodArn);

        return callback(null, { ...policy, context: { email: decoded.email } });
      }
    );
  } catch (err) {
    console.log('catch error. Invalid token', err);
    return callback('Unauthorized');
  }
};

// Public API
module.exports.publicEndpoint = async (event, context) => ({
  statusCode: 200,
  headers: {
    /* Required for CORS support to work */
    'Access-Control-Allow-Origin': '*',
    /* Required for cookies, authorization headers with HTTPS */
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify({
    message: 'Hi ⊂◉‿◉つ from Public API',
  }),
});

// Private API
module.exports.privateEndpoint = async (event, context) => ({
  statusCode: 200,
  headers: {
    /* Required for CORS support to work */
    'Access-Control-Allow-Origin': '*',
    /* Required for cookies, authorization headers with HTTPS */
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify({
    message: 'Hi ⊂◉‿◉つ from Private API. Only logged in users can see this',
    event,
    context,
  }),
});

// const generatePolicy = (principalId, methodArn) => {
//   const apiGatewayWildcard = methodArn.split('/', 2).join('/') + '/*';

//   console.log(apiGatewayWildcard);

//   return {
//     principalId,
//     policyDocument: {
//       Version: '2023-03-28',
//       Statement: [
//         {
//           Action: 'execute-api:Invoke',
//           Effect: 'Allow',
//           Resource: apiGatewayWildcard,
//           Resource: '*',
//         },
//       ],
//     },
//   };
// };

// module.exports.handler = async (event, context) => {
//   if (!event.authorizationToken) {
//     throw 'Unauthorized';
//   }

//   try {
//     const token = event.authorizationToken.replace('Bearer ', '');
//     const claims = jwt.verify(token, process.env.AUTH0_PUBLIC_KEY);
//     const policy = generatePolicy(claims.sub, event.methodArn);

//     console.log('policy: ', policy);
//     console.log('claims: ', claims);

//     return {
//       ...policy,
//       context: claims,
//     };
//   } catch (error) {
//     console.log(error);
//     throw 'Unauthorized';
//   }
// };

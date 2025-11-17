import { JWTPayload } from './../node_modules/jose/dist/types/types.d';
import type {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayRequestAuthorizerEvent,
  APIGatewayProxyHandler,
  Context,
} from 'aws-lambda';
import jwt from 'jsonwebtoken';
import {
  AuthResponse,
  PolicyDocument,
  Statement,
} from './models/auth-response';

export interface APIGatewayAuthorizerEvent
  extends APIGatewayRequestAuthorizerEvent,
    Omit<APIGatewayTokenAuthorizerEvent, 'type'> {}

// Set in `environment` of serverless.yml
// const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID!;
const AUTH0_CLIENT_PUBLIC_KEY = process.env.AUTH0_CLIENT_PUBLIC_KEY!;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE!;

// Policy helper function
// By default, API Gateway authorizations are cached (TTL) for 300 seconds.
// This policy will authorize all requests to the same API Gateway instance where the
// request is coming from, thus being efficient and optimizing costs.
const generatePolicy = (
  principalId: string,
  effect: string,
  methodArn: string
) => {
  const apiGatewayWildcard = methodArn.split('/', 2).join('/') + '/*';
  const authResponse: Partial<AuthResponse> = {};
  authResponse.principalId = principalId;
  if (effect && methodArn) {
    const policyDocument: Partial<PolicyDocument> = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne: Partial<Statement> = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = apiGatewayWildcard; //  'arn:aws:execute-api:eu-west-2:765256982446:bb95kzs7l4/dev/*/v?/*' | methodArn | '*'
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
export const auth = (
  event: APIGatewayAuthorizerEvent,
  _: Context,
  callback: any
) => {
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
        const decodedToken = decoded as JWTPayload & { email: string};
        if (verifyError || !decodedToken || !decodedToken.sub) {
          console.log('verifyError', verifyError);
          // 401 Unauthorized
          console.log(`Token invalid. ${verifyError}`);
          return callback('Unauthorized');
        }
        // is custom authorizer function
        console.log('valid from customAuthorizer', decoded);
        const policy = generatePolicy(
          decodedToken.sub as string,
          'Allow',
          event.methodArn
        );

        return callback(null, {
          ...policy,
          context: { email: decodedToken.email },
        });
      }
    );
  } catch (err) {
    console.log('catch error. Invalid token', err);
    return callback('Unauthorized');
  }
};

// export const auth = (event: APIGatewayAuthorizerEvent) => {
//   console.log('event', event);
//   if (!event.authorizationToken) {
//     throw new createError.Unauthorized('Unauthorized');
//   }

//   const tokenParts = event.authorizationToken.split(' ');
//   const tokenValue = tokenParts[1];

//   if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
//     // no auth token!
//     throw new createError.Unauthorized('Unauthorized');
//   }
//   const options = {
//     audience: AUTH0_AUDIENCE,
//   };

//   try {
//     const decoded = jwt.verify(
//       tokenValue,
//       AUTH0_CLIENT_PUBLIC_KEY,
//       options
//     ) as JwtPayload;

//     if (!decoded || !decoded.sub) {
//       // 401 Unauthorized
//       console.log(`Token invalid. ${decoded}`);
//       throw new createError.Unauthorized('Unauthorized');
//     }
//     // is custom authorizer function
//     console.log('valid from customAuthorizer', decoded);
//     const policy = generatePolicy(decoded.sub, 'Allow', event.methodArn);

//     // console.log('policy: ', policy);

//     return {
//       ...policy,
//       context: { email: decoded.email },
//     };
//   } catch (err) {
//     console.log('catch error. Invalid token', err);
//     throw new createError.Unauthorized('Unauthorized');
//   }
// };

// Public API
export const publicEndpoint = async () => ({
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
export const privateEndpoint: APIGatewayProxyHandler = async (
  event,
  context
) => ({
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

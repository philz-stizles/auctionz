const AWS = require('aws-sdk');
const createError = require('http-errors');
const commonMiddleware = require('../middlewares/commonMiddleware');
const getAuctionsSchema = require('../schemas/getAuctionsSchema');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getAuctions = async (event, context) => {
  // event.body | event.requestContext | event.queryStringParameters | event.pathParameters
  const { status } = event.queryStringParameters;

  let auctions;

  try {
    const params = {
      TableName: process.env.AUCTIONS_TABLE_NAME,
      IndexName: 'statusAndEndingAt',
      KeyConditionExpression: '#status = :status',
      ExpressionAttributeValues: {
        ':status': status,
      },
      ExpressionAttributeNames: {
        '#status': 'status',
      },
    };
    // const result = await dynamodb.scan(params).promise(); // Add the dynamodb:Scan Action to the provider.iam.role.statements.Action
    const result = await dynamodb.query(params).promise(); // Add the dynamodb:Query Action to the provider.iam.role.statements.Action
    auctions = result.Items;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
};

module.exports.handler = commonMiddleware(getAuctions, getAuctionsSchema);

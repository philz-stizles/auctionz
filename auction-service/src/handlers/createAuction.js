'use strict';

const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const createError = require('http-errors');
const commonMiddleware = require('../middlewares/commonMiddleware');
const createAuctionSchema = require('../schemas/createAuctionSchema');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const createAuction = async (event, context) => {
  // event.body | event.requestContext | event.queryStringParameters | event.pathParameters
  const { title } = event.body;
  const { email } = event.requestContext.authorizer;

  const now = new Date();
  const createdAt = now.toISOString();

  now.setHours(now.getHours() + 1);
  const endingAt = now.toISOString();
  const newAuction = {
    id: uuidv4(),
    title,
    isPublished: false,
    createdAt,
    endingAt,
    status: 'OPEN',
    highestBid: {
      amount: 0,
    },
    seller: email,
  };

  try {
    await dynamodb
      .put({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Item: newAuction,
      })
      .promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(newAuction),
  };
};

module.exports.uuidv4 = uuidv4;

module.exports.handler = commonMiddleware(createAuction, createAuctionSchema);

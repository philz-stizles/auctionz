const AWS = require('aws-sdk');
const createError = require('http-errors');
const commonMiddleware = require('../middlewares/commonMiddleware');
const placeBidSchema = require('../schemas/placeBidSchema');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const placeBid = async (event) => {
  const { auctionId: id } = event.pathParameters;
  const { amount } = event.body;
  const { email } = event.requestContext.authorizer;

  const auction = await getAuctionById(id);

  if (auction.seller === email) {
    throw new createError.Forbidden(`You cannot bid on your own auctions!`);
  }

  if (auction.highestBid.bidder === email) {
    throw new createError.Forbidden(`You are already the highest bidder!`);
  }

  if (auction.status === 'CLOSED') {
    throw new createError.Forbidden(`You cannot bid. Auction is closed!`);
  }

  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(
      `Your bid must be higher than ${auction.highestBid.amount}!`
    );
  }

  let updatedAuction;

  try {
    const params = {
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Key: { id },
      UpdateExpression:
        'set highestBid.amount = :amount, highestBid.bidder = :bidder',
      ExpressionAttributeValues: {
        ':amount': amount,
        ':bidder': email,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await dynamodb.update(params).promise();
    updatedAuction = result.Attributes; // with result.Attributes we get all the attributes of the updated auction.
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  };
};

module.exports.handler = commonMiddleware(placeBid, placeBidSchema);

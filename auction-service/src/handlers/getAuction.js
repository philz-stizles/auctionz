const AWS = require('aws-sdk');
const createError = require('http-errors');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getAuctionById = async (id) => {
  let auction;
  try {
    const result = await dynamodb
      .get({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id },
      })
      .promise();
    auction = result.Item;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if (!auction) {
    throw new createHttpError.NotFound(`Auction with ID ${id} was not found`);
  }

  return auction;
};

const getAuction = async (event) => {
  const { auctionId } = event.pathParameters;

  const auction = await getAuctionById(auctionId);

  return {
    statusCode: 200,
    body: JSON.stringify(auction, null, 2),
  };
};

exports.getAuctionById = getAuctionById;
exports.handler = getAuction;

const createError = require('http-errors');
const httpErrorHandler = require('@middy/http-error-handler');
const cors = require('@middy/http-cors');
const validator = require('@middy/validator');
const { getAuctionById } = require('./getAuction');
const {
  uploadPictureToS3,
  setAuctionPictureUrl,
} = require('../lib/uploadPictureLib');
const { default: middy } = require('@middy/core');
const uploadAuctionPictureSchema = require('../schemas/uploadAuctionPictureSchema');

const uploadAuctionPicture = async (event) => {
  const { auctionId } = event.pathParameters;

  const auction = await getAuctionById(auctionId);

  const base64 = event.body.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');

  let updatedAuction;

  try {
    const pictureUrl = await uploadPictureToS3(auction.id + '.jpg', buffer);
    updatedAuction = await setAuctionPictureUrl(auction.id, pictureUrl);
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  };
};

module.exports.handler = uploadAuctionPicture
  // .use(httpErrorHandler())
  // .use(validator({ eventSchema: transpileSchema(uploadAuctionPictureSchema) }))
  // .use(cors());

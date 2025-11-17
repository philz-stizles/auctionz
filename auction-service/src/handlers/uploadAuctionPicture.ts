'use strict';

import createError from 'http-errors';
import { uploadPictureToS3 } from '../services/upload.service';
import { Handler } from 'aws-lambda';
import auctionService from '../services';
import commonMiddleware from 'src/middlewares/common.middleware';
import uploadAuctionPictureSchema from 'src/schemas/upload-auction-picture.schema';

const uploadAuctionPicture: Handler = async (event) => {
  try {
    const { auctionId } = event.pathParameters as { auctionId: string };

    const auction = await auctionService.getById(auctionId);

    const base64 = event.body.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');
    const pictureUrl = await uploadPictureToS3(auction.id + '.jpg', buffer);

    const updatedAuction = await auctionService.updatePictureUrl(
      auction.id,
      pictureUrl
    );

    return {
      statusCode: 200,
      body: JSON.stringify(updatedAuction),
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

export const handler = commonMiddleware(
  uploadAuctionPicture,
  uploadAuctionPictureSchema
);

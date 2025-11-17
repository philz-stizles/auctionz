'use strict';

import { v4 as uuidv4 } from 'uuid';
import createError from 'http-errors';
import commonMiddleware from '../middlewares/common.middleware';
import createAuctionSchema from '../schemas/create-auction.schema';
import { Handler } from 'aws-lambda';
import auctionService from '../services';

const createAuction: Handler = async (event: any) => {
  // event.body | event.requestContext | event.queryStringParameters | event.pathParameters
  try {
    const title = event.body?.title;
    const { email } = event.requestContext.authorizer as { email: string };

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

    await auctionService.create(newAuction);

    return {
      statusCode: 201,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        /* Required for cookies, authorization headers with HTTPS */
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(newAuction),
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

export const handler = commonMiddleware(createAuction, createAuctionSchema);

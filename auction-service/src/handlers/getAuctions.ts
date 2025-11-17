'use strict';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import createError from 'http-errors';
import commonMiddleware from '../middlewares/common.middleware';
import getAuctionsSchema from '../schemas/get-auctions.schema';
import auctionService from '../services';


const getAuctions = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { status } = event.queryStringParameters as { status: string };
    const auctions = await auctionService.getAll({ status });
    return {
      statusCode: 200,
      body: JSON.stringify(auctions || []),
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

export const handler = commonMiddleware(getAuctions, getAuctionsSchema);

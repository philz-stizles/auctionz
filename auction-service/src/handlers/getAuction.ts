'use strict';

import { APIGatewayProxyEvent } from 'aws-lambda';
import commonMiddleware from '../middlewares/common.middleware';
import auctionService from '../services';

const getAuction = async (event: APIGatewayProxyEvent) => {
  const { auctionId } = event.pathParameters as { auctionId: string };

  const auction = await auctionService.getById(auctionId);

  return {
    statusCode: 200,
    body: JSON.stringify(auction, null, 2),
  };
};

export const handler = commonMiddleware(getAuction);

'use strict';

import createError from 'http-errors';
import commonMiddleware from '../middlewares/common.middleware';
import placeBidSchema from '../schemas/place-bid.schema';
import { Handler } from 'aws-lambda';
import auctionService from '../services';

const placeBid: Handler = async (event: any) => {
  const { auctionId: id } = event.pathParameters as { auctionId: string };
  const { amount } = event.body as { amount: string };
  const { email } = event.requestContext.authorizer as { email: string };

  const auction = await auctionService.getById(id);

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

  try {
    const updatedAuction = await auctionService.update(auction.id, {
      email,
      amount,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(updatedAuction),
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

export const handler = commonMiddleware(placeBid, placeBidSchema);

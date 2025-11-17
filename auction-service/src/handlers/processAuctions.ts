'use strict';

import createError from 'http-errors';
import { getEndedAuctions, closeAuction } from '../lib/processAuctionsLib';

const processAuctions = async () => {
  try {
    console.log('Processing Auctions!');

    const auctionsToClose = await getEndedAuctions();

    const closePromises = auctionsToClose?.map((auction) =>
      closeAuction(auction)
    );

    await Promise.all(closePromises);

    console.log('Processing Auctions Done!!!');

    return { close: closePromises?.length };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

export const handler = processAuctions;

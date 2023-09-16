const createError = require('http-errors');
const { getEndedAuctions, closeAuction } = require('../lib/processAuctionsLib');

const processAuctions = async (event, context) => {
  try {
    console.log('Processing Auctions!');

    const auctionsToClose = await getEndedAuctions();

    const closePromises = auctionsToClose.map((auction) =>
      closeAuction(auction.id)
    );

    await Promise.all(closePromises);

    console.log('Processing Auctions Done!!!');

    return { close: closePromises.length };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

module.exports.handler = processAuctions;

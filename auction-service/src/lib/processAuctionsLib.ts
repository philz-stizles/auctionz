import * as AWS from '@aws-sdk/client-sqs';
import createDynamoClient from '../db';
import config from '../config';
import { Auction } from '../models/auction';

const dynamodb = createDynamoClient();
const tableName = config.tableName;
const mailQueueUrl = config.mailQueueUrl;

const sqs = new AWS.SQS({ region: config.awsRegion });

export const getEndedAuctions = async () => {
  const now = new Date();
  const params = {
    TableName: tableName,
    IndexName: 'statusAndEndingAt',
    KeyConditionExpression: '#status = :status AND endingAt <= :now',
    ExpressionAttributeValues: {
      ':status': 'OPEN',
      ':now': now.toISOString(),
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  };

  const result = await createDynamoClient().query(params);
  return result.Items as Auction[];
};

export const closeAuction = async (auction: Auction) => {
  const params = {
    TableName: tableName,
    Key: { id: auction.id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeValues: {
      ':status': 'CLOSED',
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  };

  await dynamodb.update(params);

  const { title, seller, highestBid } = auction;
  const { amount, bidder } = highestBid;

  if (amount === 0) {
    await sqs.sendMessage({
      QueueUrl: mailQueueUrl,
      MessageBody: JSON.stringify({
        subject: 'No bids on your auction item :(',
        recipient: seller,
        body: `Oh no! Your item "${title}" didn't get any bids. Better luck next time!`,
      }),
    });
    return;
  }

  const notifySeller = sqs.sendMessage({
    QueueUrl: mailQueueUrl,
    MessageBody: JSON.stringify({
      subject: 'Your item has been sold!',
      recipient: seller,
      body: `Woohoo! Your item "${title}" has been sold for $${amount}.`,
    }),
  });

  const notifyBidder = sqs.sendMessage({
    QueueUrl: mailQueueUrl,
    MessageBody: JSON.stringify({
      subject: 'You won an auction!',
      recipient: bidder,
      body: `What a great deal! You got yourself a "${title}" for $${amount}.`,
    }),
  });

  return Promise.all([notifySeller, notifyBidder]);
};

import createHttpError from 'http-errors';
import { Auction } from '../models/auction';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import config from 'src/config';

class AuctionService {
  private tableName = config.tableName;

  constructor(private dynamoDBClient: DynamoDBDocument) {}

  async create(auction: Auction) {
    console.log(auction);
    await this.dynamoDBClient.put({
      TableName: this.tableName,
      Item: auction,
    });
  }

  async getById(id: string): Promise<any> {
    const result = await this.dynamoDBClient.get({
      TableName: this.tableName,
      Key: { id },
    });
    const auction = result.Item;

    if (!auction) {
      throw new createHttpError.NotFound(`Auction with ID ${id} was not found`);
    }

    return auction;
  }

  async getAll(filter: { status: string }): Promise<Auction[]> {
    const { status } = filter;
    const params = {
      TableName: this.tableName,
      IndexName: 'statusAndEndingAt',
      KeyConditionExpression: '#status = :status',
      ExpressionAttributeValues: {
        ':status': status,
      },
      ExpressionAttributeNames: {
        '#status': 'status',
      },
    };
    // const result = await dynamodb.scan(params).promise(); // Add the dynamodb:Scan Action to the provider.iam.role.statements.Action
    const result = await this.dynamoDBClient.query(params); // Add the dynamodb:Query Action to the provider.iam.role.statements.Action
    return result.Items as Auction[];
  }

  async update(
    id: string,
    { amount, email }: { amount: string; email: string }
  ) {
    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression:
        'set highestBid.amount = :amount, highestBid.bidder = :bidder',
      ExpressionAttributeValues: {
        ':amount': amount,
        ':bidder': email,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.dynamoDBClient.update(params);
    return result.Attributes as Auction; // with result.Attributes we get all the attributes of the updated auction.
  }

  async updatePictureUrl(id: string, pictureUrl: string) {
    const params = {
      TableName: config.tableName,
      Key: { id },
      UpdateExpression: 'set pictureUrl = :pictureUrl',
      ExpressionAttributeValues: {
        ':pictureUrl': pictureUrl,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.dynamoDBClient.update(params);
    return result.Attributes as Auction;
  }
}

export default AuctionService;

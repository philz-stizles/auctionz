import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import config from 'src/config';

const createDynamoClient = () => {
  const documentClient = config.isOffLine
    ? new DynamoDBClient({
        region: 'localhost',
        endpoint: 'https://localhost:5000',
      })
    : new DynamoDBClient({ region: config.awsRegion });

  return DynamoDBDocument.from(documentClient, {
    marshallOptions: {
      removeUndefinedValues: true,
    },
  });
};

export default createDynamoClient;

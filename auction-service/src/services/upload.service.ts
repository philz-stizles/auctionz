import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import config from '../config';

export const uploadPictureToS3 = async (key: any, body: any) => {
  const bucket = config.auctionsBucket;
  const region = config.awsRegion;
  const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  const s3Client = new S3Client({ region });
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  });

  const response = await s3Client.send(command);
  console.log(response);
  return url;
};

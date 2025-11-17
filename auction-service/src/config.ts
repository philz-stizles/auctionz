const awsRegion = process.env.AWS_REGION_NAME as string;
const tableName = process.env.AUCTIONS_TABLE_NAME as string;
const mailQueueUrl = process.env.MAIL_QUEUE_URL as string;
const auctionsBucket = process.env.AUCTIONS_BUCKET_NAME as string;
const isOffLine = process.env.IS_OFFLINE;

export default { awsRegion, tableName, mailQueueUrl, auctionsBucket, isOffLine };

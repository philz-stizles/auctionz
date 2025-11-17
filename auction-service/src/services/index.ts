import createDynamoClient from "../db";
import AuctionService from "./auction.service";

const dynamoClient = createDynamoClient();
const auctionService = new AuctionService(dynamoClient);
export default auctionService;

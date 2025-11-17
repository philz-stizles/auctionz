export interface Auction {
  id: string;
  title: string;
  isPublished: boolean;
  createdAt: string;
  endingAt: string;
  status: string;
  seller: string;
  highestBid: {
    amount: number;
    bidder?: string;
  };
}

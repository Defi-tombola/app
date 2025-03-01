import { Button } from "@/components/ui/button"; // Assuming you have a Button component from shadcn/ui
import { Countdown } from "@/components/ui/countdown"; // Your Countdown component
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"; // Import Card components from shadcn/ui
import Image from "next/image";
import { LotteryStatus, LotteryType } from "@/core/api/schema";
import { AssetAvatar, tokenSymbolToAvatar } from "@/components/avatar/Avatar";
import { BytesTransformer } from "@/utils"; // For handling images

export const FeaturedLottery = ({ lottery }: { lottery: LotteryType }) => {
  const {
    name,
    endDate,
    prize,
    tickets,
    ticketAsset,
    ticketPrice,
    maxTickets,
    status,
    draw,
  } = lottery;

  // Calculate total tickets bought
  const ticketsBought = tickets.reduce((sum, ticket) => sum + ticket.nTickets, 0);

  // Format prize pool
  const prizePool = `${prize.totalPrizePool.dividedBy(10 ** lottery.ticketAsset?.decimals || 6).toFixed(2)} ${prize.prizeAsset.symbol}`;

  const parsedTicketPrice = ticketPrice.dividedBy(10 ** ticketAsset?.decimals || 18).toFixed(2);
  const formattedTicketPrice = `${parsedTicketPrice} ${ticketAsset?.symbol || "Tickets"}`;

  // Determine if the lottery is ongoing
  const isOngoing = status === LotteryStatus.Ongoing;

  return (
    <Card className="hover:shadow-2xl">
      <CardHeader>
        <CardTitle className="font-bold text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <div className="flex gap-6">
          <div className="space-y-2">
            <CardDescription>Prize Pool</CardDescription>
            <div className="flex items-center justify-center">
              {tokenSymbolToAvatar({ symbol: prize.prizeAsset.symbol })}
              <p className="font-bold">{prizePool}</p>
            </div>
          </div>

          <div className="space-y-2">
            <CardDescription>Tickets Bought</CardDescription>
            <p className="font-bold">
              {ticketsBought.toLocaleString()} / {maxTickets.toLocaleString()}
            </p>
          </div>

          <div className="space-y-2">
            <CardDescription>Ticket Price</CardDescription>
            <p className="font-bold">{formattedTicketPrice}</p>
          </div>
        </div>

        <div className="space-y-2">
          <CardDescription>Expected ending</CardDescription>
          <Countdown futureDate={new Date(endDate)} />
        </div>
      </CardContent>
      <CardFooter>
        {/* Button to Lottery Page */}
        <Button
          asChild
          className="w-full font-bold py-6"
          disabled={!isOngoing} // Disable button if the lottery is not ongoing
        >
          <a href={`/tombola/${BytesTransformer.toReadableDecimal(lottery.uid)}`}>
            {isOngoing ? `Buy tickets` : "Lottery Ended"}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
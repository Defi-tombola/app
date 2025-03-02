import React from "react";
import { GetLotteriesQuery } from "@/core/api/gql/lottery/get-lotteries.gql.generated";
import { LotteryStatus, LotteryType } from "@/core/api/schema";
import { AssetAvatar, tokenSymbolToAvatar } from "../avatar/Avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { formatShortAddress } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import { BytesTransformer } from "@/utils";
import { getExplorerLinkByAddress, getExplorerLinkByTransactionHash } from "@/utils/explorer";
import { ExternalLinkIcon } from "lucide-react";

const LotteryTable = ({ lotteries }: { lotteries: LotteryType[]}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Status</TableHead>
            <TableHead className="text-left">Ticket</TableHead>
            <TableHead className="text-left">Ticket Price</TableHead>
            <TableHead className="text-left">Total Prize</TableHead>
            <TableHead className="text-left">Tickets Sold</TableHead>
            <TableHead className="text-left">Winner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lotteries.map((lottery) => (
            <LotteryCard key={lottery.id} lotteryProps={lottery} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const LotteryCard = ({ lotteryProps }: { lotteryProps: LotteryType }) => {
  const {
    id,
    uid,
    name,
    status,
    ticketAsset,
    ticketPrice,
    prize,
    tickets,
    draw,
  } = lotteryProps;

  const ticketCount = tickets.map(ticket => ticket.nTickets).reduce((a, b) => a + b, 0);
  const ticketPriceFormatted = ticketPrice.dividedBy(10 ** (ticketAsset?.decimals ?? 18)).decimalPlaces(2).toString();
  const prizePool = prize.totalPrizePool.dividedBy(10 ** (ticketAsset?.decimals ?? 18)).decimalPlaces(2).toString();

  return (
    <TableRow key={id} className="border-b">
      <TableCell className="text-left">{name}</TableCell>
      <TableCell className="text-left">
        <Badge>
          {status}
        </Badge>
      </TableCell>
      <TableCell className="text-left">
        <div className="flex items-center">
          {tokenSymbolToAvatar({ symbol: ticketAsset?.symbol })}
          <div className="ml-2">
            <div className="font-medium">{ticketAsset?.name}</div>
            <div className="text-sm text-gray-500">{ticketAsset?.symbol}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-left">
        {ticketPriceFormatted} {ticketAsset?.symbol}
      </TableCell>
      <TableCell className="text-left">
        {prizePool} {ticketAsset?.symbol}
      </TableCell>
      <TableCell className="text-left">{ticketCount}</TableCell>
      <TableCell className="text-left">
        {status === LotteryStatus.Ongoing ? (
          <Button
            type="button"
            className="font-bold"
          >
            <a href={`/tombola/${BytesTransformer.toReadableDecimal(uid)}`}>
              Buy tickets
            </a>
          </Button>
        ) : (
          <div className="flex items-center">
            <a className="flex gap-1" href={getExplorerLinkByTransactionHash(draw?.transactionHash)} target="_blank">
                <div className="font-medium underline">{formatShortAddress(draw?.winner?.address)}</div>
                <ExternalLinkIcon size="16" />
              </a>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default LotteryTable;
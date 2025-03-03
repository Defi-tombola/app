import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Copy, ExternalLink } from "lucide-react";
import { formatDistance } from "date-fns";
import { TicketType } from "@/core/api/schema";
import { getExplorerLinkByTransactionHash } from "@/utils/explorer";
import { AssetAvatar, tokenSymbolToAvatar, UserDefaultAvatar } from "@/components/avatar/Avatar";
import { formatShortAddress } from "@/components/lib/utils";
import { BytesTransformer } from "@/utils";
import BigNumber from "bignumber.js";

export const TicketFeedTable = ({ tickets }: { tickets: TicketType[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Account</TableHead>
          <TableHead>Tickets</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Lottery</TableHead>
          <TableHead>Transaction</TableHead>
          <TableHead>Purchased At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TicketRow key={ticket.id} ticket={ticket} />
        ))}
      </TableBody>
    </Table>
  );
};

const TicketRow = ({ ticket }: { ticket: TicketType }) => {
  const totalSpent = new BigNumber(ticket.totalPrice.toString()).dividedBy(10 ** (ticket.asset.decimals || 6)).toString();
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <UserDefaultAvatar/>
          <div>
            {ticket.account.name ? <p className="font-medium">{ticket.account.name || "Anonymous"}</p> : null}
            <p className="text-sm text-gray-500">{ticket.account.address.slice(0, 6)}...{ticket.account.address.slice(-4)}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>{ticket.nTickets}</TableCell>
      <TableCell>
        <div className="flex items-center">
          {tokenSymbolToAvatar({ symbol: ticket.asset.symbol })}
          {totalSpent} {ticket.asset.symbol}
        </div>
      </TableCell>
      <TableCell>
        <a className="flex gap-1 items-center underline" href={`/tombola/${BytesTransformer.toReadableDecimal(ticket.lotteryUid)}`}>
          {BytesTransformer.toReadableDecimal(ticket.lotteryUid)}
          <ExternalLink size={16} />
        </a>
      </TableCell>
      <TableCell>
          <a className="flex gap-1 items-center underline" href={getExplorerLinkByTransactionHash(ticket.transactionHash)} target="_blank" >
            {formatShortAddress(ticket.transactionHash)}
            <ExternalLink size={16} />
          </a>
      </TableCell>
      <TableCell>{formatDistance(new Date(ticket.purchasedAt), new Date(), { addSuffix: true })}</TableCell>
    </TableRow>
  );
};

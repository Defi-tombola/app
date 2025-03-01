import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { GetLotteryQuery, GetLotteryQueryVariables, LotteryStatus } from "@/core/api/schema";
import { GET_LOTTERY } from "@/core/api/gql/lottery/get-lottery.gql";
import { BytesTransformer } from "@/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Countdown } from "@/components/ui/countdown";
import { ExternalLinkIcon, TicketIcon, TicketMinusIcon, WalletIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tokenSymbolToAvatar } from "@/components/avatar/Avatar";
import { LotteryProviderService } from "@/core/services/lottery-provider";
import { getExplorerLinkByTransactionHash } from "@/utils/explorer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import buyTicketsFormSchema from "@/core/forms/buy-tickets";
import { viewOnExplorer } from "@/components/ui/view-on-explorer-toast";
import BigNumber from "bignumber.js";
import { TicketFeedTable } from "@/components/lottery/TicketFeedTable";
import { formatShortAddress } from "@/components/lib/utils";

export default function Page() {
    const router = useRouter();

    const [getLottery, { loading, data }] = useLazyQuery<GetLotteryQuery, GetLotteryQueryVariables>(GET_LOTTERY);
    const [totalCost, setTotalCost] = useState<number>(0);

    const form = useForm<z.infer<typeof buyTicketsFormSchema>>({
        resolver: zodResolver(buyTicketsFormSchema),
        defaultValues: {
            tickets: 0
        },
    })

    async function onSubmit(data: z.infer<typeof buyTicketsFormSchema>) {
        try {
            if (isAllowedAmount(data.tickets)) {
                await butTicketsHandler(data.tickets);
            } else {
                toast(`You can only buy at maximum ${lottery.maxTickets - ticketsSold} tickets.`);
            }
        } catch (error) {
            toast.error('An error occurred while buying tickets.');
            console.error(error);
        }
    }

    function handleTicketAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
        const numberOfTickets = new BigNumber(event.target.value);

        if (numberOfTickets.isNaN()) {
            setTotalCost(0);
            return
        }

        const totalCost = numberOfTickets.multipliedBy(ticketPrice).toNumber();
        setTotalCost(totalCost);
    }

    useEffect(() => {
        if (router.query.id) {
            getLottery({ variables: { uid: BytesTransformer.toBytes(router.query.id as string) } });
        }
    }, [router.query]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!data?.lottery) {
        return <p>Lottery not found</p>;
    }

    const lottery = data.lottery;
    const ticketPrice = lottery.ticketPrice.dividedBy(10 ** lottery.ticketAsset?.decimals || 18).toString();
    const ticketsSold = lottery.tickets.map(ticket => ticket.nTickets).reduce((a, b) => a + b, 0);

    function isAllowedAmount(amount: number) {
        return amount + ticketsSold <= lottery.maxTickets;
    }

    const butTicketsHandler = async (ticketAmount: number) => {
        // Handle form submission logic here
        const lotteryProvider = new LotteryProviderService();
        const tx = await lotteryProvider.buyTickets({ lottery, nTickets: ticketAmount });

        viewOnExplorer({ message: "Buying tickets", txHash: tx.hash });
        await tx.wait(1);
    };

    const parsedPrizePool = lottery.prize.totalPrizePool.dividedBy(10 ** lottery.ticketAsset?.decimals || 6).toString()

    return (
      <div>
          <div className="grid grid-cols-8 gap-4">
              <Card className="bg-linear-to-bl from-indigo-800 to-red-400 text-white col-span-8 lg:col-span-4">
                  <CardHeader>
                      <CardTitle className="text-2xl">
                          {lottery.name}
                      </CardTitle>
                      <CardDescription className="text-white">
                          Enter the lottery for {ticketPrice} {lottery.ticketAsset?.symbol} per ticket
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="grid flex grid-cols-4 gap-10">
                      <div className="cols-span-1">
                          <div className="gap-2">
                              <Badge>Lottery Prize Pool</Badge>
                              <div className="flex mt-2">
                                  {tokenSymbolToAvatar({ symbol: lottery.prize.prizeAsset.symbol })}
                                  <span
                                    className="text-2xl font-bold">{parsedPrizePool} {lottery.prize.prizeAsset.symbol}</span>
                              </div>
                          </div>
                      </div>
                      {
                          lottery.status === LotteryStatus.Ongoing ? (
                          <div>
                              <div className="font-bold">Expected close in:</div>
                              <Countdown className="max-w-sm text-white" futureDate={new Date(lottery.endDate)}

                                         showCountdown={false}></Countdown>

                              <div className="flex gap-2 mt-2">
                                  <div>
                                      <TicketIcon />
                                      Sold: <span className="font-bold">{ticketsSold}</span> tickets
                                  </div>
                                  <div>
                                      <TicketMinusIcon />
                                      Max: <span className="font-bold">{lottery.maxTickets}</span> tickets
                                  </div>
                              </div>
                          </div>
                        ) : (
                            <div className="space-y-2">
                                {/* Lottery Status Badge */}
                                <Badge >
                                    Lottery is closed
                                </Badge>

                                <div className="flex items-center gap-2">
                                    <p >Winner:</p>
                                    <a
                                      href={getExplorerLinkByTransactionHash(lottery.draw?.winner?.address)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 underline"
                                    >
                                        {formatShortAddress(lottery.draw?.winner?.address)}
                                        <ExternalLinkIcon size={16} />
                                    </a>
                                </div>

                                <div className="flex items-center gap-2">
                                    <p >Hash:</p>
                                    <a
                                      href={getExplorerLinkByTransactionHash(lottery.draw?.transactionHash)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 underline"
                                    >
                                        {formatShortAddress(lottery.draw?.transactionHash)}
                                        <ExternalLinkIcon size={16} />
                                    </a>
                                </div>
                            </div>
                          )
                      }

                  </CardContent>
              </Card>
              <Card className="col-span-8 lg:col-span-2">
                  <CardHeader>
                      <CardTitle>
                          <TicketIcon></TicketIcon>
                          <h1 className="text-2xl font-bold">Select ticket amount</h1>
                      </CardTitle>
                      <CardDescription>Choose the number of tickets you'd like to participate.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-8 flex-col">
                      <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                              <FormField
                                control={form.control}
                                name="tickets"
                                render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>
                                          <WalletIcon size="15" />
                                          Tickets</FormLabel>
                                      <FormControl>
                                          <Input disabled={lottery.status !== LotteryStatus.Ongoing} onChangeCapture={handleTicketAmountChange} type="number" placeholder="Enter amount" {...field} />
                                      </FormControl>
                                      <div className="flex justify-end">
                                          Total cost:&nbsp;<span className="font-bold"> {totalCost} {lottery.ticketAsset?.symbol}</span>
                                      </div>
                                      <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button type="submit" disabled={lottery.status !== LotteryStatus.Ongoing} className="w-full">Buy tickets</Button>
                          </form>
                      </Form>
                  </CardContent>
              </Card>
          </div>
          <div className="mt-4" >
              <p className="text-2xl font-bold">Tickets sold</p>
              <TicketFeedTable tickets={lottery.tickets}></TicketFeedTable>
          </div>
      </div>
    );
}
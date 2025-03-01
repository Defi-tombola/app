import Head from "next/head";
import { useState, useEffect } from 'react';
import { GET_LOTTERIES } from "@/core/api/gql/lottery/get-lotteries.gql";
import { useQuery, useSubscription } from "@apollo/client";
import { GetLotteriesQuery, GetLotteriesQueryVariables } from "@/core/api/gql/lottery/get-lotteries.gql.generated";
import {
  GetLatestSoldQuery,
  GetLatestSoldQueryVariables,
  LotteryStatus,
  TicketBoughtSubscription, TicketBoughtSubscriptionVariables
} from "@/core/api/schema";
import { FeaturedLottery } from "@/components/lottery/FeaturedCard";
import { FrontPage } from "@/components/lottery/FrontPage";
import { TicketFeedTable } from "@/components/lottery/TicketFeedTable";
import { GET_LATEST_SOLD_TICKETS } from "@/core/api/gql/ticket/get-latest-sold.gql";
import { TICKET_BOUGHT_SUBSCRIPTION } from "@/core/api/gql/ticket/ticket-bought.subscription.gql";
import { RadioIcon } from "lucide-react";
import BigNumber from "bignumber.js";
import { apolloClient } from "@/core/api/gql-client";

const Home = () => {
  const { loading: featuredLoading, error: featuredError, data: featuredData } = useQuery<GetLotteriesQuery, GetLotteriesQueryVariables>(GET_LOTTERIES, {
    variables: {
      filter: {
        featured: true,
        status: LotteryStatus.Ongoing
      }
    }
  });

  const { loading: subscribeLoading, error: subscribeError, data: subscribeData } = useSubscription<TicketBoughtSubscription, TicketBoughtSubscriptionVariables>(TICKET_BOUGHT_SUBSCRIPTION, {
    client: apolloClient,
  });
  const { loading: latestLoading, error: latestError, data: latestSoldTicketsData } = useQuery<GetLatestSoldQuery, GetLatestSoldQueryVariables>(GET_LATEST_SOLD_TICKETS);

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (latestSoldTicketsData?.getLastTickets) {
      setTickets(latestSoldTicketsData.getLastTickets);
    }
  }, [latestSoldTicketsData]);

  useEffect(() => {
    if (subscribeData?.ticketBought && !subscribeError && !subscribeLoading) {
      setTickets(prevTickets => [subscribeData.ticketBought, ...prevTickets]);
    }
  }, [subscribeData]);

  if (featuredLoading) return <p>Loading...</p>;
  if (featuredError) return <p>Error: {featuredError.message}</p>;

  if (latestLoading) return <p>Loading...</p>;
  if (latestError) return <p>Error: {latestError.message}</p>;

  const featuredTombolas = featuredData?.lotteries.filter(lottery => lottery.status === LotteryStatus.Ongoing) || [];
  const featuredTombolaLength = featuredTombolas.length || 0;

  return (
    <div>
      <Head>
        <title>Tombola dApp</title>
        <meta content="Tombola dapp" name="Tombola dapp" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div>
        {/*<FrontPage/>*/}
        {
          featuredTombolaLength > 0 && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Featured tombolas</h1>
              <div className="flex gap-3 my-5">
                {featuredData?.lotteries.map(lottery => (
                  <div key={lottery.id} className="">
                    <FeaturedLottery lottery={lottery}/>
                  </div>
                ))}
              </div>
            </div>
          )
        }
        <div className="font-bold text-2xl flex items-center gap-2">
          <RadioIcon size={16} className="text-red-500"></RadioIcon>
          Live feed tickets
        </div>
        <TicketFeedTable tickets={tickets}/>
      </div>
    </div>
  );
};

export default Home;
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from "@apollo/client";
import { FunctionsMap, withScalars } from "apollo-link-scalars";
import { buildClientSchema, IntrospectionQuery } from "graphql/utilities";
import introspectionResult from "../../../schema.json";
import BigNumber from "bignumber.js";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    LotteryType: {
      fields: {
        feeTicketAmount: {
          read: (value: string): BigNumber => new BigNumber(value)
        },
        ticketPrice: {
          read: (value: string): BigNumber => new BigNumber(value)
        }
      }
    },
    PrizeType: {
      fields: {
        totalPrizePool: {
          read: (value: string): BigNumber => new BigNumber(value)
        }
      }
    },
    TicketType: {
      fields: {
        totalPrice: {
          read: (value: string): BigNumber => new BigNumber(value)
        },
        individualTicketPrice: {
          read: (value: string): BigNumber => new BigNumber(value)
        }
      }
    }
  }
})

const wsConfig :WebSocketLink.Configuration = {
  uri: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL ?? "http://localhost:8001/ws",
  options: {
    reconnect: true,
    lazy: true,
    // reconnect: true,
    // connectionParams: () => {
    //   return {headers: {Authorization: 'Bearer TOKEN'}}
    // }
  }
};


const httplink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL ?? "http://localhost:8001/"
});

const link = process.browser ? split( //only create the split in the browser
  // split based on operation type
  ({ query }) => {
    //@ts-ignore
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  new WebSocketLink(wsConfig),
  httplink,
) : httplink;

export const apolloClient = new ApolloClient({
  cache,
  link,
});

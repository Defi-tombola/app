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
  uri: process.env.GRAPHQL_WS_URL,
  options: {
    reconnect: true,
    lazy: true,
    // reconnect: true,
    // connectionParams: () => {
    //   return {headers: {Authorization: 'Bearer TOKEN'}}
    // }
  }
};

const wsLink = process.browser ? new WebSocketLink(wsConfig) : null;

const httplink = new HttpLink({
  uri: process.env.GRAPHQL_HTTP_URL
});

const link = process.browser ? split( //only create the split in the browser
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httplink,
) : httplink;

export const apolloClient = new ApolloClient({
  cache,
  link,
});

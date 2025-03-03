/* eslint-disable */
// @ts-ignore
import BigNumber from "bignumber.js";
import * as Types from "../../schema";

import { gql } from "@apollo/client";
import { AssetFragmentDoc } from "./asset.fragment.gql.generated";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Decimal: { input: BigNumber; output: BigNumber };
};

export type AccountType = {
  __typename?: "AccountType";
  address: Scalars["String"]["output"];
  avatar?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["String"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  twitter?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["String"]["output"];
};

export type AssetType = {
  __typename?: "AssetType";
  address: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  decimals?: Maybe<Scalars["Int"]["output"]>;
  deprecated: Scalars["Boolean"]["output"];
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  symbol: Scalars["String"]["output"];
  type: Scalars["String"]["output"];
};

export type AuthType = {
  __typename?: "AuthType";
  accessToken: Scalars["String"]["output"];
  account?: Maybe<AccountType>;
  address: Scalars["String"]["output"];
};

export enum DrawStatus {
  Cancelled = "CANCELLED",
  Completed = "COMPLETED",
  Pending = "PENDING",
}

export type DrawType = {
  __typename?: "DrawType";
  drawDate?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  lotteryId: Scalars["String"]["output"];
  status: DrawStatus;
  transactionHash?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["String"]["output"];
  winner?: Maybe<AccountType>;
};

export type LinkTwitterInput = {
  code: Scalars["String"]["input"];
  state: Scalars["String"]["input"];
};

export type LoginSignatureInput = {
  /** Signature for provided timestamp */
  signature: Scalars["String"]["input"];
  /** Timestamp used for the signature */
  timestamp: Scalars["String"]["input"];
};

export type LotteryFilterInput = {
  featured?: InputMaybe<Scalars["Boolean"]["input"]>;
  status?: InputMaybe<LotteryStatus>;
  uid?: InputMaybe<Scalars["String"]["input"]>;
};

export enum LotteryStatus {
  Cancelled = "CANCELLED",
  Completed = "COMPLETED",
  Ongoing = "ONGOING",
  Scheduled = "SCHEDULED",
}

export type LotteryType = {
  __typename?: "LotteryType";
  createdAt: Scalars["String"]["output"];
  draw?: Maybe<DrawType>;
  endDate: Scalars["String"]["output"];
  feeTicketAmount: Scalars["Decimal"]["output"];
  id: Scalars["String"]["output"];
  maxTickets: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  prize: PrizeType;
  startDate: Scalars["String"]["output"];
  status: LotteryStatus;
  ticketAsset?: Maybe<AssetType>;
  ticketPrice: Scalars["Decimal"]["output"];
  tickets: Array<TicketType>;
  uid: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  linkTwitterToAccount: AccountType;
  /** Exchange signature to token that can be used to authorize user */
  loginWithSignature: AuthType;
  /** Update current account with provided data */
  updateAccount: AccountType;
};

export type MutationLinkTwitterToAccountArgs = {
  input: LinkTwitterInput;
};

export type MutationLoginWithSignatureArgs = {
  input: LoginSignatureInput;
};

export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};

export enum PrizeStatus {
  Active = "ACTIVE",
  Distributed = "DISTRIBUTED",
  Refunded = "REFUNDED",
}

export type PrizeType = {
  __typename?: "PrizeType";
  createdAt: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  lotteryId: Scalars["String"]["output"];
  prizeAsset: AssetType;
  status: PrizeStatus;
  totalPrizePool: Scalars["Decimal"]["output"];
  updatedAt: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  /** Get account graph by address */
  account: AccountType;
  /** Get list of all supported assets */
  assets: Array<AssetType>;
  /** Fetches the last 10 tickets sold */
  getLastTickets: Array<TicketType>;
  getUserTickets: Array<TicketType>;
  /** Get list of all supported assets */
  lotteries: Array<LotteryType>;
  lottery: LotteryType;
  twitterAuthUrl: Scalars["String"]["output"];
  verify?: Maybe<DrawType>;
};

export type QueryAccountArgs = {
  address: Scalars["String"]["input"];
};

export type QueryGetUserTicketsArgs = {
  address: Scalars["String"]["input"];
};

export type QueryLotteriesArgs = {
  input: LotteryFilterInput;
};

export type QueryLotteryArgs = {
  uid: Scalars["String"]["input"];
};

export type QueryTwitterAuthUrlArgs = {
  redirectUri: Scalars["String"]["input"];
};

export type QueryVerifyArgs = {
  txHash: Scalars["String"]["input"];
};

export type Subscription = {
  __typename?: "Subscription";
  ticketBought: TicketType;
};

export type TicketType = {
  __typename?: "TicketType";
  account: AccountType;
  asset: AssetType;
  createdAt: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  /** Represent the price of each ticket */
  individualTicketPrice: Scalars["Decimal"]["output"];
  lotteryId: Scalars["String"]["output"];
  lotteryUid: Scalars["String"]["output"];
  /** Represent the number of tickets the user has bought on this transaction */
  nTickets: Scalars["Int"]["output"];
  purchasedAt: Scalars["String"]["output"];
  /** Represent the total price of all the tickets bought */
  totalPrice: Scalars["Decimal"]["output"];
  transactionHash: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
};

export type UpdateAccountInput = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  twitter?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetAssetsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAssetsQuery = {
  __typename?: "Query";
  assets: Array<{
    __typename?: "AssetType";
    address: string;
    createdAt: string;
    decimals?: number | null;
    deprecated: boolean;
    id: string;
    name: string;
    symbol: string;
    type: string;
  }>;
};

export const GetAssetsDocument = gql`
  query GetAssets {
    assets {
      ...Asset
    }
  }
  ${AssetFragmentDoc}
`;

/**
 * __useGetAssetsQuery__
 *
 * To run a query within a React component, call `useGetAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAssetsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAssetsQuery,
    GetAssetsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAssetsQuery, GetAssetsQueryVariables>(
    GetAssetsDocument,
    options,
  );
}
export function useGetAssetsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAssetsQuery,
    GetAssetsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAssetsQuery, GetAssetsQueryVariables>(
    GetAssetsDocument,
    options,
  );
}
export function useGetAssetsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAssetsQuery, GetAssetsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAssetsQuery, GetAssetsQueryVariables>(
    GetAssetsDocument,
    options,
  );
}
export type GetAssetsQueryHookResult = ReturnType<typeof useGetAssetsQuery>;
export type GetAssetsLazyQueryHookResult = ReturnType<
  typeof useGetAssetsLazyQuery
>;
export type GetAssetsSuspenseQueryHookResult = ReturnType<
  typeof useGetAssetsSuspenseQuery
>;
export type GetAssetsQueryResult = Apollo.QueryResult<
  GetAssetsQuery,
  GetAssetsQueryVariables
>;

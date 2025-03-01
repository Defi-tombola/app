import gql from 'graphql-tag';

import { LOTTERY_FRAGMENT } from './lottery.fragment.gql';

export const GET_LOTTERIES = gql`
  ${LOTTERY_FRAGMENT}

  query GetLotteries($filter: LotteryFilterInput!) {
      lotteries(input: $filter) {
          ...Lottery
      }
  }
`;

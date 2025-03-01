import gql from 'graphql-tag';

import { LOTTERY_FRAGMENT } from './lottery.fragment.gql';

export const GET_LOTTERY = gql`
    ${LOTTERY_FRAGMENT}

    query GetLottery($uid: String!) {
        lottery(uid: $uid) {
            ...Lottery
        }
    }
`;

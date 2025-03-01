import gql from 'graphql-tag';
import { ACCOUNT_FRAGMENT } from "../account/account.fragment.gql";

export const DRAW_FRAGMENT = gql`
    ${ACCOUNT_FRAGMENT}
    fragment Draw on DrawType {
        drawDate
        id
        lotteryId
        status
        updatedAt
        transactionHash
        winner {
            ...Account
        }
    }
`;

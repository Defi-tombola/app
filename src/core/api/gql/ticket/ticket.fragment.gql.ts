import gql from 'graphql-tag';
import { ACCOUNT_FRAGMENT } from "../account/account.fragment.gql";
import { ASSET_FRAGMENT } from "@/core/api/gql/asset/asset.fragment.gql";

export const TICKET_FRAGMENT = gql`
    ${ACCOUNT_FRAGMENT}
    ${ASSET_FRAGMENT}
    fragment Ticket on TicketType {
        createdAt
        updatedAt
        lotteryId
        lotteryUid
        id
        asset {
            ...Asset
        }
        account {
            ...Account
        }
        transactionHash
        purchasedAt
        nTickets
        totalPrice
        individualTicketPrice
    }
`;

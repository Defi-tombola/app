import gql from 'graphql-tag';
import { ASSET_FRAGMENT } from '../asset/asset.fragment.gql';
import { TICKET_FRAGMENT } from "../ticket/ticket.fragment.gql";
import { DRAW_FRAGMENT } from "../draw/draw.fragment.gql";
import { PRIZE_FRAGMENT } from "../prize/prize.fragment.gql";

export const LOTTERY_FRAGMENT = gql`
    ${ASSET_FRAGMENT}
    ${TICKET_FRAGMENT}
    ${DRAW_FRAGMENT}
    ${PRIZE_FRAGMENT}
    fragment Lottery on LotteryType {
        createdAt
        endDate
        feeTicketAmount
        id
        maxTickets
        name
        startDate
        status
        tickets {
            ...Ticket
        }
        draw {
            ...Draw
        }
        prize {
            ...Prize
        }
        ticketAsset {
            ...Asset
        }
        ticketPrice
        uid
        updatedAt
    }
`;

import gql from 'graphql-tag';
import { TICKET_FRAGMENT } from "@/core/api/gql/ticket/ticket.fragment.gql";

export const GET_LATEST_SOLD_TICKETS = gql`
    ${TICKET_FRAGMENT}

    query GetLatestSold {
        getLastTickets {
            ...Ticket
        }
    }
`;

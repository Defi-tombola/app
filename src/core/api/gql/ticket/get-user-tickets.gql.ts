import gql from 'graphql-tag';
import { TICKET_FRAGMENT } from "@/core/api/gql/ticket/ticket.fragment.gql";

export const GET_USER_TICKETS = gql`
    ${TICKET_FRAGMENT}

    query GetUserTickets($address: String!) {
        getUserTickets(address: $address) {
            ...Ticket
        }
    }
`;

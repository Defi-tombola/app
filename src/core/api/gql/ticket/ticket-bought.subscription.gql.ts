import gql from 'graphql-tag';
import { TICKET_FRAGMENT } from "@/core/api/gql/ticket/ticket.fragment.gql";

export const TICKET_BOUGHT_SUBSCRIPTION = gql`
    ${TICKET_FRAGMENT}

    subscription TicketBought {
        ticketBought {
            ...Ticket
        }
    }
`;

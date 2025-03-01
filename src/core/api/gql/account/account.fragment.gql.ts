import gql from 'graphql-tag';

export const ACCOUNT_FRAGMENT = gql`
    fragment Account on AccountType {
        twitter
        address
        name
        avatar
        createdAt
        updatedAt
    }
`;

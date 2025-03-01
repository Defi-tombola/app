import gql from 'graphql-tag';

export const ASSET_FRAGMENT = gql`
  fragment Asset on AssetType {
      address
      createdAt
      decimals
      deprecated
      id
      name
      symbol
      type
  }
`;

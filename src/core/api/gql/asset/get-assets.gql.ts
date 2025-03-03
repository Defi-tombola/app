import gql from 'graphql-tag';
import { ASSET_FRAGMENT } from "@/core/api/gql/asset/asset.fragment.gql";

export const GET_ASSETS = gql`
    ${ASSET_FRAGMENT}

    query GetAssets {
        assets {
            ...Asset
        }
    }
`;

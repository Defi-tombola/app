import gql from 'graphql-tag';
import { ASSET_FRAGMENT } from "../asset/asset.fragment.gql";

export const PRIZE_FRAGMENT = gql`
    ${ASSET_FRAGMENT}
    fragment Prize on PrizeType {
        createdAt
        updatedAt
        status
        lotteryId
        id
        prizeAsset {
            ...Asset
        }
        totalPrizePool
    }
`;

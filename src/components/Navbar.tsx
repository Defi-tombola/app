import {ConnectButton} from "@rainbow-me/rainbowkit";
import { ModeToggle } from "@/components/ui/theme-toggle";
import AssetDropdown from "@/components/asset/AssetDropdown";
import { useQuery } from "@apollo/client";
import { GetAssetsQuery, GetAssetsQueryVariables } from "@/core/api/schema";
import { GET_ASSETS } from "@/core/api/gql/asset/get-assets.gql";
import { useEffect } from "react";

const Navbar = () => {
  const { loading, error, data } = useQuery<GetAssetsQuery, GetAssetsQueryVariables>(GET_ASSETS);

  let assets = []

    return (
      <div className="flex justify-end items-end">
        <div className="mr-3">
          {
            loading ? <p>Loading...</p> : <AssetDropdown assets={data?.assets ?? []} />
          }
        </div>
        <div className="pr-2">
          <ModeToggle />
        </div>
        <ConnectButton />
      </div>
    )
}

export default Navbar;
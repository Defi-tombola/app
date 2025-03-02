import {useEthersProvider, useEthersSigner} from "@/utils/ethers";
import {DEFAULT_CHAIN_ID} from "@/utils";
import {FallbackProvider, JsonRpcProvider, JsonRpcSigner} from "@ethersproject/providers";

export type JsonRPCProvider = JsonRpcProvider | FallbackProvider;
export const networkProvider = {
    getProvider: async (chainId = DEFAULT_CHAIN_ID): Promise<JsonRPCProvider>  => {
        const provider = useEthersProvider({ chainId });

        if (!provider) {
            throw new Error("Provider not found");
        }

        return provider
    },

    getSigner: async (chainId = DEFAULT_CHAIN_ID): Promise<JsonRpcSigner> => {
        const signer = useEthersSigner({ chainId });

        if (!signer) {
            throw new Error("Signer not found");
        }

        return signer
    },

    isConnected: async (chainId = DEFAULT_CHAIN_ID): Promise<boolean> => {
        try {
            const provider = await this.getProvider();
            const blockNumber = await provider.getBlockNumber();
            return true
        } catch (error) {
            return false;
        }
    }
}
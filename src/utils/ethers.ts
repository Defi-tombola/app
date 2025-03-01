import { providers } from 'ethers'
import type { Chain, Client, Transport } from 'viem'
import { Config, useClient } from 'wagmi'
import { getClient, getConnectorClient } from "@wagmi/core";
import { config } from '@/wagmi';

export async function useEthersProvider({
                                      chainId,
                                  }: { chainId?: number | undefined } = {}) {
    const client = await getClient<Config>(config, { chainId})
    const { chain, transport } = client
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    if (transport.type === 'fallback')
        return new providers.FallbackProvider(
          (transport.transports as ReturnType<Transport>[]).map(
            ({ value }) => new providers.JsonRpcProvider(value?.url, network),
          ),
        )
    return new providers.JsonRpcProvider(transport.url, network)
}

/** Hook to convert a Viem Client to an ethers.js Signer. */
export async function useEthersSigner({ chainId }: { chainId?: number } = {}) {
    const client = await getConnectorClient<Config>(config, { chainId})
    const { account, chain, transport } = client
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    const provider = new providers.Web3Provider(transport, network)
    const signer = provider.getSigner(account.address)
    return signer
}
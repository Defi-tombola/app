import {
 monadTestnet,
} from 'wagmi/chains';
import {createConfig, http} from "wagmi";

export const config = createConfig({
    chains: [monadTestnet],
    ssr: true,
    transports: {
        [monadTestnet.id]: http(),
    },
})
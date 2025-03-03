import {
 monadTestnet,
} from 'wagmi/chains';
import {createConfig, http} from "wagmi";
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
  appName: 'Tombola dapp',
  projectId: 'MYPROJECT',
  chains: [monadTestnet],
})
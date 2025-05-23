import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from "@apollo/client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { darkTheme, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "../core/globals.css";

import { config } from "@/wagmi";
import Layout from "../components/Layout";
import { apolloClient } from "@/core/api/gql-client";
import { ThemeProvider } from "@/components/ThemeProvider";
import React from "react";
import { Toaster } from "sonner";
import Head from "next/head";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider theme={{
          lightMode: lightTheme(),
          darkMode: darkTheme(),
        }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <Layout>
              <Head>
                <title>Tombola dApp</title>
                <meta content="Tombola dapp" name="Tombola dapp" />
                <link href="/lottery/tickets.png" rel="icon" />
                <meta charset="utf-8" />
                <meta name="icon" content="/lottery/tickets.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                  name="description"
                  content="A Decentralized & Provably fair Tombola. Buy tickets and verify the result onchain."
                />
              </Head>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
    </ApolloProvider>
  );
}

export default MyApp;

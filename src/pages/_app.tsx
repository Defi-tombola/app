import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from "@apollo/client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { darkTheme, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "../core/globals.css";

import { config } from '../wagmi';
import Layout from "../components/Layout";
import { apolloClient } from '../core/api/gql-client';
import { ThemeProvider } from "@/components/ThemeProvider";
import React from "react";
import { Toaster } from "sonner";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider coolMode={true} showRecentTransactions={true}     theme={{
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

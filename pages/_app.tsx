import "../styles/globals.css";
import type { AppProps } from "next/app";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";

const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.goerli,
  ],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY_FOR_MAINNET }),
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY_FOR_GOERLI }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "DiodProtocol",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={ wagmiClient }>
      <RainbowKitProvider chains={ chains } theme={ midnightTheme() }>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

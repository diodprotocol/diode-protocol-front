import "react-datepicker/dist/react-datepicker.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";


const { chains, provider } = configureChains(
  [
    // chain.mainnet,
    chain.goerli,
    chain.polygon,
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_FOR_GOERLI }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_FOR_POLYGON }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "DiodeProtocol",
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

import { useAccount } from "wagmi";
import { PageConnected } from "./pageConneced";
import { PageNotConnected } from "./pageNotConnected";
import Head from "next/head";


export default function Home() {

  const { isConnected } = useAccount();

  let page;
  if (isConnected) {
    page = <PageConnected />;        
  } else {
    page = <PageNotConnected />;
  }

  return (
    <div>
      <Head>
        <title> Diode Protocol </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/images/favicon.ico" />
      </Head>
      { page } 
    </div>
  )
}

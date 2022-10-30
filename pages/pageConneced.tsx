import { Fragment } from "react";
import { Page } from "../components/common/page";
import { DarkButton } from "../components/common/button";
import { PropsVaultView, VaultView } from "../components/vault/vaultView";
import { useRouter } from "next/router";


const vault: PropsVaultView = {
    name: "Vault Name",
    assetName: "Vault Asset Name",
    assetPoolAddress: "0x79C604DdA2cfE62f0bF0DE879f18881609653FB6",
    strategyName: "Stratety name",
    strategyPoolAddress: "0x123456",
    priceFeed: "Price feed",
    totalHoldings: "1000",
    apy: "2.5%"
}


export const PageConnected = () => {    
    const router = useRouter();
    return (
        <Fragment>
            
            <Page>
                <div className="w-full flex flex-col justify-start items-start gap-6">
                    
                    <div className="w-full flex flex-row justify-between items-center">
                        <div className="text-2xl font-sans font-light">
                            Pools
                        </div>
                        <DarkButton
                            onClick={ () => router.push("/factory") }
                        >                            
                            Create Pool                            
                        </DarkButton>
                    </div>  

                    <div className="w-full flex flex-col justify-start items-start gap-8">
                        <VaultView { ...vault} />
                    </div>

                </div>
            </Page>

        </Fragment>
    );
}

export default PageConnected;
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/router'

// import { useParams, useNavigate } from "react-router-dom";
// import { Page } from "../components/common/page";
// import { ContestDepositAsset } from "../components/contest/contestDepositAsset";
// import { ContestItemsWarpper } from "../components/contest/contestItemsWrapper";
// import { ContestParameters } from "../components/contest/contestParameters";
// import { ContestSubTitle, ContestTitle } from "../components/contest/contestTitle";
// import { ContestRedeemShares } from "../components/contest/contestRedeemShares";
// import { ContestUserConvertToAssets, ContestUserConvertToShares } from "../components/contest/contestUserConverters";
// import { ContestUserPreviewDeposit, ContestUserPreviewWithdraw } from "../components/contest/contestUserPreviews";
// import { useAccount } from "wagmi";

import { Page } from "../../components/common/page";
import { DarkButton } from "../../components/common/button";
import { VaultInformation } from "../../components/vault/vaultInformation";
import { VaultAction } from "../../components/vault/vaultAction";


export const PageVault = () => {
    
    const [ vaultName, setVaultName ] = useState<string>("Vault Name");
    const [ assetName, setAssetName ] = useState<string>("Asset Name");
    const [ strategyName, setStrategyName ] = useState<string>("Strategy Name");

    const router = useRouter();
    const { contractAddress } = router.query;

    return (

        <Page>
        
            <div className="w-full flex flex-col justify-start items-start gap-6">
                
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="text-2xl font-sans font-light">
                        { vaultName }
                    </div>
                    <DarkButton
                        onClick={() => router.push("/") }
                    >                        
                        Back to contests
                    </DarkButton> 
                </div>

                <div className="
                    h-full
                    w-full
                    flex flex-row justify-start items-start
                    border
                    border-[0.1px]
                    border-zinc-200
                    rounded-md
                    divide-x-[0.2px] divide-zinc-200"
                >
                    <div className="w-1/3 h-full">
                        <VaultInformation />                    
                    </div>
                    <div className="w-2/3 h-full">
                        <VaultAction/>
                    </div>
                </div>
                
            </div>
            
        </Page>
    );


}

export default PageVault;
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
import { useContractVaultRead } from "../../lib/hooks/useContractVaultRead";


export const PageVault = () => {
    
    const [ vaultName, setVaultName ] = useState<string>("Vault Name");
    const [ assetName, setAssetName ] = useState<string>("Asset Name");
    const [ strategyName, setStrategyName ] = useState<string>("Strategy Name");



    const router = useRouter();
    const query = router.query;
    
    let contractAddress = "";
    if ( query.contractAddress && router.isReady) {
        if (Array.isArray(query.contractAddress)) {
            contractAddress = query.contractAddress[0];
        } else {
            contractAddress = query.contractAddress
        }
    }

    const name = useContractVaultRead(contractAddress, "name");
    const symbol = useContractVaultRead(contractAddress, "symbol");

    return (

        <Page>
        
            <div className="w-full flex flex-col justify-start items-start gap-6">
                
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="text-2xl font-sans font-light">
                        { `${ name.value } - ${ symbol.value }`}
                    </div>
                    <DarkButton
                        onClick={() => router.push("/") }
                    >                        
                        Back to vaults
                    </DarkButton> 
                </div>

                <div className="                    
                    w-full                    
                    flex flex-row items-stretch gap-4
                    "
                >
                    <div className="
                        w-2/5
                        rounded-md
                        border
                        border-[0.2px]
                        border-zinc-600
                        "
                    >
                        {
                            (contractAddress) ? 
                            <VaultInformation contractAddress={ contractAddress } /> :
                            null
                        }
                    </div>
                    <div className="
                        w-3/5
                        rounded-md       
                        border
                        border-[0.2px]
                        border-zinc-600
                        "
                    >
                        {
                            (contractAddress) ? 
                            <VaultAction contractAddress={ contractAddress} /> :
                            null
                        }                        
                    </div>
                </div>
                
            </div>
            
        </Page>
    );

}

export default PageVault;

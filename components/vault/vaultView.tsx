import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useContractVaultRead } from "../../lib/hooks/useContractVaultRead";
import { Button, DarkButton } from "../common/button";
import { EthAddress } from "../common/ethAddress";


export interface PropsVaultView {
    name: string;
    assetName: string;
    assetPoolAddress: string;
    strategyName: string,
    strategyPoolAddress: string;
    priceFeed: string;
    totalHoldings: string;
    apy: string;
}

const VaultInfoView = (props: { children: ReactNode }) => {
    return (
    <div className="text-xs font-sans text-zinc-400 font-light">
        { props.children }
    </div>
    );
}

const VaultValueView = (props: { children: ReactNode }) => {
    return (
        <div className="text-base font-sans text-zinc-200 font-light">
            { props.children }
        </div>
    );
}

const VaultBlockView = (props: {children: ReactNode, reverse?: boolean}) => {
    if (!props.reverse) {
        return (
            <div className="
                py-4
                px-4
                w-full
                flex flex-col justify-start items-start
                gap-2
                "
            >
                { props.children }
            </div>
        );    
    } else {
        return (
            <div className="
                py-4
                px-4
                w-full
                flex flex-col justify-end items-end
                gap-2
                "
            >
                { props.children }
            </div>
        );  
    }
}

export const VaultView = (props: PropsVaultView) => {
    
    const router = useRouter();

    const name = useContractVaultRead(props.assetPoolAddress, "name");
    const symbol = useContractVaultRead(props.assetPoolAddress, "symbol");
    const totalDeposits = useContractVaultRead(props.assetPoolAddress, "totalDeposits");

    return (
        <div className="
            h-36
            w-full
            flex flex-row justify-between items-stretch divide-x-[0.3px] divide-zinc-600
            border
            border-[0.3px]
            border-zinc-600
            bg-zinc-800
            rounded-md
            bg-gradient-to-l from-zinc-900 to-zinc-800 hover:from-zinc-800
            "
            onClick={ () => router.push("/vault/" + props.assetPoolAddress) }
            // transition ease-in-out duration-100 hover:scale-[1.01]
        >

            <VaultBlockView>
                <div className="text-lg font-sans font-light text-zinc-400">
                    { `${ symbol.value }`}
                </div>                
                <div className="text-2xl font-sans font-light">
                    { `${ name.value }`}
                </div>
                <div className="text-xl font-sans text-zinc-400 font-light">
                    { "Euler" }
                </div>
            </VaultBlockView>
            
            <VaultBlockView>
                <VaultInfoView>
                    APY
                </VaultInfoView>
                
                <VaultValueView>
                    { props.apy }
                </VaultValueView>
                
                <VaultInfoView>
                    Total holdings
                </VaultInfoView>
                
                <VaultValueView>
                    { totalDeposits.value }
                </VaultValueView>                

            </VaultBlockView>           

            <VaultBlockView >
                <VaultInfoView>
                    Pool address
                </VaultInfoView>
                <VaultValueView>
                    { EthAddress({ label: "", address: props.assetPoolAddress }) }
                </VaultValueView>
                <VaultInfoView>                    
                    Your positions
                </VaultInfoView>   
                <VaultValueView>
                    { 1 }
                </VaultValueView>
            </VaultBlockView>
            

            <VaultBlockView reverse={ true }>

                <DarkButton onClick={ () => console.log("withdraw") }>
                    <div className="w-24 text-xs font-sans font-normal">
                        Withdraw
                    </div>
                </DarkButton>

                <Button onClick={ () => console.log("click") }>
                    <div className="w-24 text-xs font-sans font-normal">
                        Deposit
                    </div>
                </Button>

            </VaultBlockView>

        </div>
    )
}
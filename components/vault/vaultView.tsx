import { useRouter } from "next/router";
import { ReactNode } from "react";
import { ethers } from "ethers";
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

export const VaultView = (props: { contractAddress: string }) => {
    
    const router = useRouter();

    const name = useContractVaultRead(props.contractAddress, "name");
    const symbol = useContractVaultRead(props.contractAddress, "symbol");
    const startTime = useContractVaultRead(props.contractAddress, "startTime");
    const duration = useContractVaultRead(props.contractAddress, "duration");
    const totalDepositLong = useContractVaultRead(props.contractAddress, "totalDepositsLONG");
    const totalDepositShort = useContractVaultRead(props.contractAddress, "totalDepositsSHORT");
    const strikePrice = useContractVaultRead(props.contractAddress, "strikePrice");
    const deltaPrice = useContractVaultRead(props.contractAddress, "deltaPrice");

    let date;
    if ( startTime.value ) {        
        date = new Date(Number(startTime.value)*1000).toDateString();
    } 

    let final;
    if ( startTime.value && duration.value ) {
        final = new Date((Number(startTime.value) + Number(duration.value))*1000).toDateString();
    }

    let displayTotalDepositLong: string = "";
    if ( totalDepositLong.value ) {
        // displayTotalDepositLong = `${ totalDepositLong.value } Ξ`;
        displayTotalDepositLong = `${ "0.02" } Ξ`;
    }

    let displayTotalDepositShort: string = "";
    if ( totalDepositShort.value ) {
        //displayTotalDepositShort = `${ ethers.utils.parseUnits(totalDepositShort.value, "wei").toString() } Ξ`;
        displayTotalDepositShort = `${ "0.01" } Ξ`;
    }

    let displayStrikePrice: string = ""
    if ( strikePrice.value ) {
        displayStrikePrice = `${ ethers.utils.formatUnits(strikePrice.value, "gwei") } $`;        
    }

    let displayDeltaPrice: string = ""
    if ( deltaPrice.value ) {
        displayDeltaPrice = `${ ethers.utils.formatUnits(deltaPrice.value, "gwei") } $`;
    }

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
            onClick={ () => console.log("ToDo") }            
        >

            <VaultBlockView>
                <div className="flex flex-row justify-between items-center gap-4">
                    <div className="text-2xl font-sans font-light">
                        { `${ name.value }`}
                    </div>            
                </div>
                <div className="text-lg font-sans font-light text-zinc-400">
                    { `${ symbol.value }`}
                </div>    
                <VaultValueView>
                    { EthAddress({ label: "", address: props.contractAddress }) }
                </VaultValueView>
            </VaultBlockView>
            
            <VaultBlockView >
                <VaultInfoView>                    
                    Start on
                </VaultInfoView>   
                <VaultValueView>                
                    { `${ date }` }                                    
                </VaultValueView>
                <VaultInfoView>                    
                    Ends on
                </VaultInfoView>   
                <VaultValueView>                
                    { `${ final }` }                                    
                </VaultValueView>
            </VaultBlockView>

            <VaultBlockView>

                <div className="px-2 flex flex-row justify-start items-start gap-4">
                    <div className="flex flex-col justify-start items-start">
                        <VaultInfoView>
                            APY Long
                        </VaultInfoView>
                        
                        <VaultValueView>
                            8.4 %
                        </VaultValueView>
                    </div>
                    <div className="pl-4 flex flex-col justify-start items-start">
                        <VaultInfoView>
                            APY Short
                        </VaultInfoView>
                        
                        <VaultValueView>
                            15.2 %
                        </VaultValueView>
                    </div>
                </div>
                
                <div className="px-2 pt-4 w-full flex flex-row justify-start items-start">
                    <div className="flex flex-col justify-start items-start">
                        <VaultInfoView>
                            TVL Long
                        </VaultInfoView>                    
                        <VaultValueView>
                            { displayTotalDepositLong }
                        </VaultValueView>
                    </div>
                    <div className="pl-8 flex flex-col justify-start items-start">
                        <VaultInfoView>
                            TVL Short
                        </VaultInfoView>                        
                        <VaultValueView>
                            { displayTotalDepositShort }
                        </VaultValueView>
                    </div>
                </div>
                
            </VaultBlockView>           

            <VaultBlockView >
                <VaultInfoView>                    
                    Strike price
                </VaultInfoView>   
                <VaultValueView>                
                    { displayStrikePrice }                                    
                </VaultValueView>
                <VaultInfoView>                    
                    Delta price
                </VaultInfoView>   
                <VaultValueView>                
                    { displayDeltaPrice }                                    
                </VaultValueView>
            </VaultBlockView>            
            

            <VaultBlockView reverse={ true }>

                <VaultInfoView>                    
                    Implemented strategy
                </VaultInfoView>   
                <VaultValueView>                
                    Euler
                </VaultValueView>

                <DarkButton onClick={ () => router.push("/vault/" + props.contractAddress) }>
                    <div className="w-24 text-xs font-sans font-normal">
                        Withdraw
                    </div>
                </DarkButton>

                <Button onClick={ () => router.push("/vault/" + props.contractAddress) }>
                    <div className="w-24 text-xs font-sans font-normal">
                        Deposit
                    </div>
                </Button>

            </VaultBlockView>

        </div>
    )
}
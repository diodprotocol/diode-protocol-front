import { ReactNode } from "react";
import { useContractVaultRead } from "../../lib/hooks/useContractVaultRead";
import { EthAddress } from "../common/ethAddress";
import { ethers } from "ethers";
import { number } from "prop-types";


export const VaultInformationItem = (props: {label: string, name: string}) => {
    
    let value;
    const name = props.name;

    if (name && name.length === 42) {
        value = EthAddress({label: "", address: props.name });
    } else {
        value = props.name;
    }

    return (
        <div className="
            w-full
            py-2
            px-4            
            flex flex-col justify-start items-start gap-2
            "
        >

            <div className="text-xs text-zinc-400 font-sans font-light">
                { props.label }
            </div>

            <div className="h-6 text-sm text-zinc-200 font-sans font-light">
                { value }
            </div>

        </div>
    )
}

export const VaultInformationItemWrapper = (props: { children: ReactNode}) => {
    return (
        <div className="
            w-full
            flex flex-row justify-start items-center        
            divide-x-[0.1px]
            divide-zinc-600
            "
        >
            { props.children }
        </div>
    );
}

export const VaultInformation = (props: { contractAddress: string }) => {

    const asset = useContractVaultRead(props.contractAddress, "suppliedAsset");
    const strikePrice = useContractVaultRead(props.contractAddress, "strikePrice");
    const deltaPrice = useContractVaultRead(props.contractAddress, "deltaPrice");
    const finalTime = useContractVaultRead(props.contractAddress, "finalTime");
    const startTime = useContractVaultRead(props.contractAddress, "startTime");
    const priceFeed = useContractVaultRead(props.contractAddress, "chainlinkPriceFeed");
    const totalDeposit = useContractVaultRead(props.contractAddress, "totalDeposits");
    const totalDepositLong = useContractVaultRead(props.contractAddress, "totalDepositsLONG");
    const totalDepositShort = useContractVaultRead(props.contractAddress, "totalDepositsSHORT");
    const alphaLongs = useContractVaultRead(props.contractAddress, "alphaLongs");
    const alphaShorts = useContractVaultRead(props.contractAddress, "alphaShorts");
    const apyLong = useContractVaultRead(props.contractAddress, "currentAPY_longs");
    const apyShort = useContractVaultRead(props.contractAddress, "currentAPY_shorts");

    let start: string = "";
    if ( startTime.value ) {        
        start = new Date(Number(startTime.value)*1000).toDateString();
    } 

    let final: string = "";
    if ( finalTime.value ) {
        final = new Date(Number(finalTime.value)*1000).toDateString();
    }

    let displayTotalDepositLong: string = "";
    if ( totalDepositLong.value ) {
        displayTotalDepositLong = `${ ethers.utils.formatUnits(totalDepositLong.value, "ether") } Ξ`;
    }

    let displayTotalDepositShort: string = "";
    if ( totalDepositShort.value ) {
        displayTotalDepositShort = `${ ethers.utils.formatUnits(totalDepositShort.value, "ether") } Ξ`;
    }

    let displayTotalValueLocked: string = "";
    if ( totalDeposit.value ) {
        displayTotalValueLocked = `${ ethers.utils.formatUnits(totalDeposit.value, "ether") } Ξ`;
    }    

    let displayStrikePrice: string = ""
    if ( strikePrice.value ) {
        displayStrikePrice = `${ ethers.utils.formatUnits(strikePrice.value, "gwei") } $`;
    }

    let displayDeltaPrice: string = ""
    if ( deltaPrice.value ) {
        displayDeltaPrice = `${ ethers.utils.formatUnits(deltaPrice.value, "gwei") } $`;
    }

    let displayAlphaLong: string = ""
    if ( alphaLongs.value ) {
        displayAlphaLong = `${ ethers.utils.formatUnits(alphaLongs.value, "gwei") } $`;
    }

    let displayAlphaShort: string = ""
    if ( alphaShorts.value ) {
        displayAlphaShort = `${ ethers.utils.formatUnits(alphaShorts.value, "gwei") } $`;
    }

    const APY = 10;
    let displayApyLong = "0.0"; 
    let displayApyShort = "0.0";
    if ( totalDepositShort.value && totalDepositLong.value ) {
        const totalDepositShortFloat = Number(ethers.utils.formatUnits(totalDepositShort.value, "ether"));
        const totalDepositLongFloat = Number(ethers.utils.formatUnits(totalDepositLong.value, "ether"));
        displayApyLong = (APY * ( totalDepositShortFloat / totalDepositLongFloat )).toFixed(2).toString()
        displayApyShort = (APY * ( totalDepositLongFloat / totalDepositShortFloat )).toFixed(2).toString()
    }

    return (
        <div className="
            w-full
            h-full
            flex flex-col justify-start items-start
            overflow-hidden
            divide-y-[0.1px]
            divide-zinc-600
            "
        >

            <VaultInformationItemWrapper>
                <VaultInformationItem
                    label="Asset address"
                    name={ asset.value! }
                />
                <VaultInformationItem
                    label="Price feed"
                    name={ priceFeed.value! }
                />            
            </VaultInformationItemWrapper>

            <VaultInformationItemWrapper>
                <VaultInformationItem
                    label="Diode pool"
                    name={ props.contractAddress }
                />
                <VaultInformationItem
                    label="Total value locked"
                    name={ displayTotalValueLocked }
                />
            </VaultInformationItemWrapper>

            <VaultInformationItemWrapper>
                <VaultInformationItem
                    label="Contract starts on"
                    name={ start }
                />
                <VaultInformationItem
                    label="Contract ends on"
                    name={ final }
                />      
            </VaultInformationItemWrapper>
            
            <VaultInformationItemWrapper>
                <VaultInformationItem
                    label="Strike price"
                    name={ displayStrikePrice }
                />
                <VaultInformationItem
                    label="Delta price"
                    name={ displayDeltaPrice }
                />
            </VaultInformationItemWrapper>

            <VaultInformationItemWrapper>
                <VaultInformationItem
                    label="Total Deposit Long"
                    name={ displayTotalDepositLong }
                />
                <VaultInformationItem
                    label="Total Deposit Short"
                    name={ displayTotalDepositShort }
                />
            </VaultInformationItemWrapper>

            <VaultInformationItemWrapper>
                <VaultInformationItem
                    label="APY long"
                    name={ displayApyLong }
                />
                <VaultInformationItem
                    label="APY short"
                    name={ displayApyShort }
                />                         
            </VaultInformationItemWrapper>

        </div>
    );
}
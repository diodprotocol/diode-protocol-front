import { ReactNode } from "react";
import { useContractVaultRead } from "../../lib/hooks/useContractVaultRead";
import { EthAddress } from "../common/ethAddress";


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
            divide-zinc-200
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
         
    return (
        <div className="
            w-full
            h-full
            flex flex-col justify-start items-start
            overflow-hidden
            divide-y-[0.1px]
            divide-zinc-200
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
                    name={ totalDeposit.value! }
                />
            </VaultInformationItemWrapper>

            <VaultInformationItemWrapper>
                <VaultInformationItem
                    label="Contract starts on"
                    name={ startTime.value! }
                />
                <VaultInformationItem
                    label="Contract ends on"
                    name={ finalTime.value! }
                />      
            </VaultInformationItemWrapper>
            
            <VaultInformationItemWrapper>
                <VaultInformationItem
                    label="Strike price"
                    name={ strikePrice.value! }
                />
                <VaultInformationItem
                    label="Delta price"
                    name={ deltaPrice.value! }
                />
            </VaultInformationItemWrapper>

            <VaultInformationItemWrapper>
                <VaultInformationItem
                    label="Total Deposit Long"
                    name={ totalDepositLong.value! }
                />
                <VaultInformationItem
                    label="Total Deposit Short"
                    name={ totalDepositShort.value! }
                />
            </VaultInformationItemWrapper>

            <VaultInformationItemWrapper>
                <VaultInformationItem
                    label="Alpha long"
                    name={ alphaLongs.value! }
                />
                <VaultInformationItem
                    label="Alpha short"
                    name={ alphaShorts.value! }
                />                         
            </VaultInformationItemWrapper>

        </div>
    );
}
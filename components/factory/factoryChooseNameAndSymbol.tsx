import { Dispatch } from "react";
import { FactoryAction, FactoryInput } from "./factoryHelpers";


interface PropsFactoryChooseStrikePrice {
    name: string;
    setName: Dispatch<string>;
    symbol: string;
    setSymbol: Dispatch<string>;
}

export const FactoryChooseNameAndSymbol = (props: PropsFactoryChooseStrikePrice) => {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-2">           
            <FactoryAction>
                Choose the vault name and symbol
            </FactoryAction>
            <FactoryInput
                title="Vault name"
                placeholder="Enter vault name"
                value={ props.name }
                setValue={ props.setName }
                unit=""
            />          
            <FactoryInput
                title="Vault symbol"
                placeholder="Enter vault symbol "
                value={ props.symbol }
                setValue={ props.setSymbol }
                unit=""
            />    
        </div>
    );
}

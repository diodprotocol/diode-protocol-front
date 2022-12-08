import { Dispatch } from "react";
import { FactoryAction, FactoryInput } from "./factoryHelpers";


interface PropsFactoryChooseStrikePrice {
    strikePrice: string;
    setStrikePrice: Dispatch<string>;
    deltaPrice: string;
    setDeltaPrice: Dispatch<string>;
    fee: string;
    setFee: Dispatch<string>;
}

export const FactoryChooseStrikePrice = (props: PropsFactoryChooseStrikePrice) => {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-2">

            <FactoryAction>
                Choose the strike price and price variation
            </FactoryAction>

            <FactoryInput
                title="Choose the strike price"
                placeholder="Enter the strike price here"
                value={ props.strikePrice }
                setValue={ props.setStrikePrice }
                unit=""
            />    
                 
            <FactoryInput
                title="Choose the delta price"
                placeholder="Enter the delta price here"
                value={ props.deltaPrice }
                setValue={ props.setDeltaPrice }
                unit=""
            />

            <FactoryInput
                title="Choose the pool fee"
                placeholder="Enter the pool fee here"
                value={ props.fee }
                setValue={ props.setFee }
                unit="%"
                type="number"
            />
              
        </div>
    );
}

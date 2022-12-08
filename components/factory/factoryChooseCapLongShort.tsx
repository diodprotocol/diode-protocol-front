import { Dispatch } from "react";
import { FactoryAction, FactoryInput } from "./factoryHelpers";


interface PropsFactoryChooseCapLongShort {
    maxCapLong: string;
    setMaxCapLong: Dispatch<string>;
    maxCapShort: string;
    setMaxCapShort: Dispatch<string>;
}

export const FactoryChooseCapLongShort = (props: PropsFactoryChooseCapLongShort) => {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-2">

            <FactoryAction>
                Choose the max amount for longs in pool
            </FactoryAction>

            <FactoryInput
                title="Choose the max long amount"
                placeholder="Enter the max amount for long positions"
                value={ props.maxCapLong }
                setValue={ props.setMaxCapLong }
                unit=""
            />    
                 
            <FactoryInput
                title="Choose the max short amount"
                placeholder="Enter the max amount for short positions"
                value={ props.maxCapShort }
                setValue={ props.setMaxCapShort }
                unit=""
            />    
              
        </div>
    );
}

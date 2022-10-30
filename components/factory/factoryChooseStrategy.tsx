import { Dispatch } from "react";
import { supportedStrategy } from "../constants";
import { AddressListbox } from "../common/addressListBox";
import { FactoryAction } from "./factoryHelpers";


interface PropsFactoryChooseStrategy {
    strategy: string;
    setStrategy: Dispatch<string>;
}


export const FactoryChooseStrategy = (props: PropsFactoryChooseStrategy) => {        
    return (
        <div className="w-full">
            <FactoryAction>
                Choose strategy
            </FactoryAction>
            <AddressListbox
                listOfAddress={ supportedStrategy }
                setAssetAddress={ props.setStrategy }
            />
        </div>                
    );
}

import { Dispatch } from "react";
import { supportedPriceFeed } from "../constants";
import { AddressListbox } from "../common/addressListBox";
import { StepperPannel } from "../stepper/stepperPannel";
import { FactoryAction, FactoryButton, FactoryButtonWrapper } from "./factoryHelpers";


interface PropsFactoryChoosePriceFeed {
    priceFeed: string;
    setPriceFeed: Dispatch<string>;
}


export const FactoryChoosePriceFeed = (props: PropsFactoryChoosePriceFeed) => {        
    return (
        <div className="w-full">
            <FactoryAction>
                Choose the asset price feed from Chainlink
            </FactoryAction>
            <AddressListbox
                listOfAddress={ supportedPriceFeed }
                setAssetAddress={ props.setPriceFeed }
            />
        </div>                        
    );
}

import { Dispatch } from "react";
import { supportedPriceFeed } from "../constants";
import { AddressListbox } from "../common/addressListBox";
import { StepperPannel } from "../stepper/stepperPannel";
import { FactoryAction, FactoryButton, FactoryButtonWrapper } from "./factoryHelpers";


interface PropsFactoryChoosePriceFeed {
    priceFeed: string;
    setPriceFeed: Dispatch<string>;
    onClickNext: () => void;
    onClickBack: () => void;
}


export const FactoryChoosePriceFeed = (props: PropsFactoryChoosePriceFeed) => {        
    return (
        <StepperPannel>

            <div className="w-full">
                <FactoryAction>
                    Choose price feed
                </FactoryAction>
                <AddressListbox
                    listOfAddress={ supportedPriceFeed }
                    setAssetAddress={ props.setPriceFeed }
                />
            </div>
                        
            <FactoryButtonWrapper>
                <FactoryButton onClick={ props.onClickBack }>
                    Back
                </FactoryButton>
                <FactoryButton 
                    onClick={ props.onClickNext } 
                    // disabled={ ( assetSymbol.isError || !assetSymbol.value ) }
                >
                    Next
                </FactoryButton>
            </FactoryButtonWrapper>
        
        </StepperPannel>
    );
}

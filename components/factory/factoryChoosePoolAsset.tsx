import { Dispatch } from "react";
import { supportedAssets } from "../constants";
import { AddressListbox } from "../common/addressListBox";
import { StepperPannel } from "../stepper/stepperPannel";
import { FactoryAction, FactoryButton, FactoryButtonWrapper } from "./factoryHelpers";


interface PropsFactoryChooseAssetPool {
    assetPool: string;
    setAssetPool: Dispatch<string>;
    onClickNext: () => void;
    onClickBack: () => void;
}


export const FactoryChooseAssetPool = (props: PropsFactoryChooseAssetPool) => {
    return (
        <StepperPannel>

            <div className="w-full">
                <FactoryAction>
                    Choose asset pool
                </FactoryAction>
                <AddressListbox
                    listOfAddress={ supportedAssets }
                    setAssetAddress={ props.setAssetPool }
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

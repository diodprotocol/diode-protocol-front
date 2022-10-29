import { Dispatch } from "react";
import { supportedStrategy } from "../constants";
import { AddressListbox } from "../common/addressListBox";
import { StepperPannel } from "../stepper/stepperPannel";
import { FactoryAction, FactoryButton, FactoryButtonWrapper } from "./factoryHelpers";


interface PropsFactoryChooseStrategy {
    strategy: string;
    setStrategy: Dispatch<string>;
    onClickNext: () => void;
    onClickBack: () => void;
}


export const FactoryChooseStrategy = (props: PropsFactoryChooseStrategy) => {        
    return (
        <StepperPannel>

            <div className="w-full">
                <FactoryAction>
                    Choose strategy
                </FactoryAction>
                <AddressListbox
                    listOfAddress={ supportedStrategy }
                    setAssetAddress={ props.setStrategy }
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

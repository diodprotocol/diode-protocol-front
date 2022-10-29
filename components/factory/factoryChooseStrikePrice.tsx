import { Dispatch } from "react";
import { StepperPannel } from "../stepper/stepperPannel";
import { FactoryAction, FactoryButton, FactoryButtonWrapper, FactoryInput, FactoryTip } from "./factoryHelpers";


interface PropsFactoryChooseStrikePrice {
    strikePrice: string;
    setStrikePrice: Dispatch<string>;
    deltaPrice: string;
    setDeltaPrice: Dispatch<string>;
    onClickBack: () => void;
    onClickNext: () => void;
}

export const FactoryChooseStrikePrice = (props: PropsFactoryChooseStrikePrice) => {

    return (
        <StepperPannel>

            <FactoryAction>
                Choose the strike price
            </FactoryAction>
            
            <FactoryInput
                title="Choose the strike price"
                placeholder="strike price"
                value={ props.strikePrice }
                setValue={ props.setStrikePrice }
                unit=""
            />

            <FactoryAction>
                Choose the delta price
            </FactoryAction>
            
            <FactoryInput
                title="Choose the delta price"
                placeholder="Delta price"
                value={ props.deltaPrice }
                setValue={ props.setDeltaPrice }
                unit=""
            />
       
            <FactoryButtonWrapper>
                <FactoryButton onClick={ props.onClickBack }>
                    Back
                </FactoryButton>
                <FactoryButton 
                    onClick={ props.onClickNext }
                    // disabled={ !( supportedFees.value === "true" && Number(props.withdrawalFee) > 0 && Number(props.withdrawalFee) < 100 ) }
                >
                    Next
                </FactoryButton>
            </FactoryButtonWrapper>
                
        </StepperPannel>
    );
}

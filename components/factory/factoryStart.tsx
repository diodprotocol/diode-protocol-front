import { StepperPannel } from "../stepper/stepperPannel";
import { FactoryButton, FactoryButtonWrapper } from "./factoryHelpers";


export const FactoryStart = (props: { onClickStart: () => void }) => {
    return (
        <StepperPannel>

            <div className="py-3 text-base text-semibold">
                You are about to start a new Diode Pool, congrats.
            </div>

            <FactoryButtonWrapper>
                <FactoryButton onClick={ props.onClickStart } >
                    Unerstood
                </FactoryButton>
            </FactoryButtonWrapper>
    
        </StepperPannel>
    );
}

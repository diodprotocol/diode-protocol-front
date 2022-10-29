import { Dispatch } from "react";
import { ChooseButton } from "../common/chooseButton";
import { ChooseButtonWrapper } from "../common/chooseButtonWrapper";
import { StepperPannel } from "../stepper/stepperPannel";
import { FactoryAction, FactoryButtonWrapper, FactoryInput, FactoryTip, FactoryButton } from "./factoryHelpers";


const getTimestampInNdays = (nDays: number): number => {
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return nextweek.getTime();
}

const formatTimeStart = (timeStart: string): string => {
    if (timeStart === "") return "";
    if (timeStart === "0") return "";
    let date = new Date(timeStart);
    return date.toISOString();
}

const timeStartChoices = [
    {
        display: "tomorrow",
        value: getTimestampInNdays(1)
    },
    {
        display: "next week",
        value: getTimestampInNdays(7)
    },
    {
        display: "next month",
        value: getTimestampInNdays(30)
    }
];

const durationChoices = [
    {
        display: "1 month",
        value: 3600*24*30
    },
    {
        display: "3 months",
        value: 3600*24*30*3
    },
    {
        display: "6 months",
        value: 3600*24*30*6
    },
    {
        display: "1 year",
        value: 3600*24*30*12
    },
];


interface PropsFactoryChoosePeriod {
    timeStart: string;
    setTimeStart: Dispatch<string>;
    duration: string;
    setDuration: Dispatch<string>; 
    onClickBack: () => void;
    onClickNext: () => void;
}


export const FactoryChoosePeriod = (props: PropsFactoryChoosePeriod) => {

    // const supportedVestingPeriod = useFactoryReadSupportedVestingPeriods(props.vestingPeriod);

    // useEffect(() => {
    //     supportedVestingPeriod.refetch()
    // }, [ props.vestingPeriod ]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StepperPannel>

            <FactoryAction>
                Choose the start period
            </FactoryAction>

            <FactoryInput
                title="Choose start period"
                placeholder="Start timestamp"
                value={ props.timeStart }
                setValue={ props.setTimeStart }
                unit=""
            />

            <ChooseButtonWrapper>
                { 
                    timeStartChoices.map((choice, index) => {
                        return (
                            <ChooseButton 
                                key={ index } 
                                onClick={ () => props.setTimeStart(choice.value.toString()) } 
                            >
                                { choice.display }
                            </ChooseButton>
                        )})
                }
            </ChooseButtonWrapper>            

            <FactoryAction>
                Choose the contract duration
            </FactoryAction>

            <FactoryInput
                title="Choose duration"
                placeholder="Duration"
                value={ props.duration }
                setValue={ props.setDuration }
                unit="seconds"
            />

            <ChooseButtonWrapper>
                { 
                    durationChoices.map((choice, index) => {
                        return (
                            <ChooseButton 
                                key={ index } 
                                onClick={ () => props.setDuration(choice.value.toString()) } 
                            >
                                { choice.display }
                            </ChooseButton>
                        )})
                }
            </ChooseButtonWrapper>

            <FactoryButtonWrapper>
                <FactoryButton 
                    onClick={ props.onClickBack }
                >
                    Back
                </FactoryButton>
                <FactoryButton 
                    onClick={ props.onClickNext } 
                    // disabled={ !( supportedVestingPeriod.value === "true" && Number(props.vestingPeriod) > 0 ) }
                >
                    Next
                </FactoryButton>
            </FactoryButtonWrapper>
                
        </StepperPannel>
    );
}

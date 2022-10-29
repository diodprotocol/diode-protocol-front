import { StepperPannel } from "../stepper/stepperPannel";
import { TransactionButton } from "../transaction/transactionButton";
import { FactoryAction, FactoryButton, FactoryButtonWrapper, FactoryReviewItem } from "./factoryHelpers";


interface PropsFactoryDeployReview {
    assetPool: string;
    priceFeed: string;
    strategy: string;
    timeStart: string;
    duration: string;
    strikePrice: string;
    deltaPrice: string;
    onClickBack: () => void;
    onClickNext?: () => void;
}


export const FactoryDeployReview = (props: PropsFactoryDeployReview) => {

    // const { factoryAddress } = useFactoryParams();
    // const { writeContract, transaction } = useFactoryWriteDeploy(factoryAddress, props.asset, withrawFeeToSend, props.vestingPeriod, 3000000);

    return (
        <StepperPannel>

            <FactoryAction>
                Review pool
            </FactoryAction>

            <div className="w-full flex-row justify-start items-start overflow-hidden rounded-md">

                <FactoryReviewItem 
                    name="Asset poll"
                    value={ props.assetPool }
                />

                <FactoryReviewItem 
                    name="Price feed"
                    value={ props.priceFeed }
                />

                <FactoryReviewItem 
                    name="Strategy"
                    value={ props.strategy }
                />

                <FactoryReviewItem 
                    name="Time start"
                    value={ props.timeStart }
                />

                <FactoryReviewItem 
                    name="Duration"
                    value={ props.duration }
                />                

                <FactoryReviewItem 
                    name="Strike price"
                    value={ props.strikePrice }
                />

                <FactoryReviewItem 
                    name="Delta price"
                    value={ props.deltaPrice }
                />                         

            </div>

            <FactoryAction>
                Are you ready ?
            </FactoryAction>
 
            <FactoryButtonWrapper>
                
                <FactoryButton onClick={ props.onClickBack }>
                    Back
                </FactoryButton>

                <TransactionButton
                    // onClick={ (transaction.isSuccess) ? () => { writeContract.reset(); props.onClickNext() } : () => { writeContract.write?.() } }
                    // disabled={ !writeContract.write }
                    // isError={ writeContract.isError || transaction.isError }
                    // isWaiting={ ( writeContract.isLoading || writeContract.isSuccess ) && transaction.isLoading }
                    // isSuccess={ transaction.isSuccess }
                    // bgSecondary={ true }
                >
                    Launch
                </TransactionButton>

            </FactoryButtonWrapper>
                
        </StepperPannel>
    );
}

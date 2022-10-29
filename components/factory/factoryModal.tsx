import { useState, ReactNode, Fragment } from "react";
import { IStep } from "../stepper/stepper";
import { FactoryStart } from "./factoryStart";
import { FactoryChooseAssetPool } from "./factoryChoosePoolAsset";
import { FactoryDeployReview } from "./factoryDeployReview";
import { FactoryChoosePriceFeed } from "./factoryChoosePriceFeed";
import { FactoryChooseStrategy } from "./factoryChooseStrategy";
import { FactoryChoosePeriod } from "./factoryChoosePeriod";
import { FactoryChooseStrikePrice } from "./factoryChooseStrikePrice";


export const FactoryModal = (props: { closeModal: () => void }) => {

    const steps: Array<IStep> = [
        { id: "1", name: "AssetPool", href: "#" },
        { id: "2", name: "PriceFeed", href: "#" },
        { id: "3", name: "Strategy", href: "#" },
        { id: "4", name: "Period", href: "#" },
    ]

    const [ selected, setSelected ] = useState<number>(0);
    
    const [ assetPool, setAssetPool ] = useState<string>("");
    const [ priceFeed, setPriceFeed ] = useState<string>("");
    const [ strategy, setStrategy ] = useState<string>("");
    
    const [ timeStart, setTimeStart ] = useState<string>("0");
    const [ duration, setDuration ] = useState<string>("");
    const [ strikePrice, setStrikePrice ] = useState<string>("");
    const [ deltaPrice, setDeltaPrice ] = useState<string>("");

    const increaseSelected = () => {
        if (selected === 6 ) return;
        setSelected(selected+1);        
    }

    const decreaseSelected = () => {
        if (selected === 0) return;
        setSelected(selected-1);
    }

    let content: ReactNode = "";

    switch (selected) {
        case 0:
            content = <FactoryStart onClickStart={ increaseSelected }/>
            break;
        case 1:
            content = <FactoryChooseAssetPool
                assetPool={ assetPool }
                setAssetPool={ setAssetPool }
                onClickBack={ decreaseSelected }
                onClickNext={ increaseSelected }
            />
            break;
        case 2:
            content = <FactoryChoosePriceFeed
                priceFeed={ priceFeed }
                setPriceFeed={ setPriceFeed }
                onClickBack={ decreaseSelected }
                onClickNext={ increaseSelected }
            />;
            break; 
            case 3:
                content = <FactoryChooseStrategy
                strategy={ strategy }
                setStrategy={ setStrategy }
                onClickBack={ decreaseSelected }
                onClickNext={ increaseSelected }
                />;
                break
        case 4:
            content = <FactoryChoosePeriod
                timeStart={ timeStart }
                setTimeStart={ setTimeStart }
                duration={ duration }
                setDuration={ setDuration }
                onClickBack={ decreaseSelected }
                onClickNext={ increaseSelected }
            />;
            break;
        case 5:
            content = <FactoryChooseStrikePrice
                strikePrice={ strikePrice }
                setStrikePrice={ setStrikePrice }
                deltaPrice={ deltaPrice }
                setDeltaPrice={ setDeltaPrice }
                onClickBack={ decreaseSelected }
                onClickNext={ increaseSelected }
            />;
            break;                          
        case 6:
            content = <FactoryDeployReview
                assetPool={ assetPool }
                priceFeed={ priceFeed }
                strategy={ strategy }
                timeStart={ timeStart }
                duration={ duration }
                strikePrice={ strikePrice }
                deltaPrice={ deltaPrice }
                onClickBack={ decreaseSelected }
                onClickNext={ undefined }
            />;
            break;
        default:
            console.log("This should not happen");
    }

    return (
        <div className="
            w-[32rem] 
            px-4 
            py-4
            text-zinc-100            
            rounded-md
            bg-zinc-800
            flex flex-col justify-start items-start gap-4
            "
        >
            
            <div className="w-fill text-xl my-2">
                Create a new pool
            </div>
            
            <Fragment>
                { content }
            </Fragment>
            
        </div>
    );

}
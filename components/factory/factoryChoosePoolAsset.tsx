import { Dispatch } from "react";
import { supportedAssets } from "../constants";
import { AddressListbox } from "../common/addressListBox";
import { FactoryAction } from "./factoryHelpers";


interface PropsFactoryChooseAssetPool {
    assetPool: string;
    setAssetPool: Dispatch<string>;
}


export const FactoryChooseAssetPool = (props: PropsFactoryChooseAssetPool) => {
    return (
        <div className="w-full">
            <FactoryAction>
                Choose asset pool
            </FactoryAction>
            <AddressListbox
                listOfAddress={ supportedAssets }
                setAssetAddress={ props.setAssetPool }
            />
        </div>
    );
}

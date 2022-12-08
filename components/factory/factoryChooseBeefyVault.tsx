import { Dispatch } from "react";
import { supportedBeefyVaults } from "../constants";
import { AddressListbox } from "../common/addressListBox";
import { FactoryAction } from "./factoryHelpers";


export const FactoryChooseBeefyVault = (props: { setAddress: Dispatch<string> }) => {        
    return (
        <div className="w-full">
            
            <FactoryAction>
                Choose the beefy vault
            </FactoryAction>

            <AddressListbox
                listOfAddress={ supportedBeefyVaults }
                setAssetAddress={ props.setAddress }
            />

        </div> 
    );
}

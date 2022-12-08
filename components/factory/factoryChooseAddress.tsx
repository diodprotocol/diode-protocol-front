import { Dispatch } from "react";
import { AddressListbox } from "../common/addressListBox";
import { FactoryAction } from "./factoryHelpers";


export const FactoryChooseAddress = (props: { title: string, choices: Array<{name: string, address: string}>, setAddress: Dispatch<string> }) => {        
    return (
        <div className="w-full">
            
            <FactoryAction>
                { props.title }
            </FactoryAction>

            <AddressListbox
                listOfAddress={ props.choices }
                setAssetAddress={ props.setAddress }
            />

        </div> 
    );
}

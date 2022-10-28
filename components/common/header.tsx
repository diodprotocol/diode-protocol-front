// import { EgplantIconBig } from "../../icons/egplant";
// import { WalletButton } from "../wallet/walletButton";

import { DiodIcon } from "../icons/diodIcon";
import { WalletButton } from "../wallet/walletButton";


export const Header = () =>  {    
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row justify-start items-center gap-4">
                <div className="text-zinc-200 border border-zinc-200 rounded-md">
                    <DiodIcon />
                </div>
                <div className="text-left text-xl font-semibold text-zinc-200 w-full">
                    Diod Protocol
                </div>
            </div>
            <div className="flex justify-end">
                <WalletButton />
            </div>            
        </div> 
    );
}

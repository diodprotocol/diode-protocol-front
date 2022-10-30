import truncateEthAddres from "truncate-eth-address";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";


export interface PropsEthAddress {
    label: string;
    address: string;
}

export const EthAddress = (props: PropsEthAddress) => {
    return (
        <div className="flex flex-row items-center justify-start gap-2">
            <div className="text-xs font-mono truncate">
                { (props.address) ? truncateEthAddres(props.address) : null }
            </div>
            <div className="bg-zinc-600 rounded-full p-[0.5px] transition ease-in-out duration-150 hover:scale-110">                
                <DocumentDuplicateIcon className="w-3 h-3" onClick={() => { navigator.clipboard.writeText(props.address) }} />                
            </div>
            <div>
                {/* <ToolTip tooltip="Copy address"> */}
                    <a 
                        className="flex justify-center items-center transition ease-in-out duration-150 hover:scale-110"
                        href={ `https://goerli.etherscan.io/address/${ props.address }` }
                        rel="noopener noreferrer"
                        target="_blanck"
                    >
                        {/* Scan <PolygonIcon className="w-6 h-6"/> */}
                    </a>
                {/* </ToolTip> */}
            </div>
        </div>
    );
}

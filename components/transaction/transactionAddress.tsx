import truncateEthAddres from "truncate-eth-address";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";


export interface PropsEthAddress {
    label: string;
    address: string;
}

export const TransactionAddress = (props: PropsEthAddress) => {
    return (
        <div className="px-4 py-1 flex flex-row items-center justify-start gap-2 rounded-lg bg-zinc-900 border border-zinc-600">
            <div className="text-xs font-mono">
                { props.label }
            </div>
            <div className="text-xs font-mono truncate">
                { (props.address) ? truncateEthAddres(props.address) : null }
            </div>
            <div className="bg-slate-600 rounded-full p-1 transition ease-in-out duration-150 hover:scale-110">
                {/* <ToolTip tooltip="Copy address"> */}
                    <DocumentDuplicateIcon className="w-4 h-4" onClick={() => { navigator.clipboard.writeText(props.address) }} />
                {/* </ToolTip> */}
            </div>
            <div>
                {/* <ToolTip tooltip="Copy address">
                    <a 
                        className="flex justify-center items-center transition ease-in-out duration-150 hover:scale-110"
                        href={ `https://polygonscan.com/address/${ props.address }` }
                        rel="noopener noreferrer"
                        target="_blanck"
                    >
                        <PolygonIcon className="w-6 h-6"/>
                    </a>
                </ToolTip> */}
            </div>
        </div>
    );
}

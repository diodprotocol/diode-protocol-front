import { Dispatch } from "react";


export interface PropsContestContractWriteView {
    value: any;
    setValue: Dispatch<any>;
}

export const TransactionInput = (props: PropsContestContractWriteView) => {
    return (
        <div className="w-full flex flex-row justify-start items-center gap-2">
            <input className="
                w-full
                py-2
                px-4                
                flex 
                text-center
                text-zinc-200
                bg-transparent
                rounded-lg
                outline-none                
                font-light
                text-sm
                "   
                type="number"
                step="0.001"
                min="0"
                value={ props.value }
                onChange={ props.setValue } 
            />
        </div>
    )
}
import { Dispatch } from "react";


export const TransactionChooseLongShort = (props: { setPosition: Dispatch<string>, currentPosition?: string}) => {
    let units: Array<string>;    
    units = ["long", "short"];

    return (
        <div className="
            flex flex-row justify-start items-center 
            divide-x divide-zinc-600 
            border
            border-[0.2px]
            rounded-lg 
            border-zinc-600
            overflow-hidden
            "
        >
            {
                units.map((item, index) => (                    
                    <div 
                        className={`
                            px-4 py-1.5 mx-auto text-xs font-light font-mono hover:text-white
                            ${ (units[index] === props.currentPosition) ? "bg-violet-600/70" : "bg-zinc-800" }
                        `}
                        key={ index }
                        onClick={ () => props.setPosition(units[index]) } 
                    >
                        { item }
                    </div>
                ))
            }
        </div>  
    );
}

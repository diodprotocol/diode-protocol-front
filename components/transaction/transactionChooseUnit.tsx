import { Dispatch } from "react";


export const TransactionChooseUnit = (props: { setUnit: Dispatch<string>, units?: Array<string>, currentUnit?: string}) => {
    let units: Array<string>;
    
    if (!props.units) {
        units = ["ether", "gwei", "wei"];
    } else {
        units = props.units;
    }

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
                            ${ (units[index] === props.currentUnit) ? "bg-orange-400/60" : "bg-zinc-800" }
                        `}
                        key={ index }
                        onClick={ () => props.setUnit(units[index]) } 
                    >
                        { item }
                    </div>
                ))
            }
        </div>  
    );
}

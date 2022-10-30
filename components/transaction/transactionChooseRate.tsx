import { Dispatch } from "react";
import { Button, HoverButton } from "../common/button";


export const TransactionChooseRate = (props: { setRate: Dispatch<number>, values?: Array<number> }) => {

    let values: Array<number>;
    
    if (!props.values) {
        values = [ 1, 5, 10, 20, 50, 90 ];
    } else {
        values = props.values;
    }

    return (
        <div className="
            h-10 
            w-full 
            flex flex-row justify-between items-center gap-2
            "
        >
            {
                values.map((item, index) => (
                    <HoverButton
                        key={ index }
                        onClick={ () => props.setRate(item) }                        
                    >
                        <div className="h-full">
                            { `${ item } %` }
                        </div>
                    </HoverButton>
                ))
            }
        </div>
    );
}

import { Tab } from "@headlessui/react";
import { Fragment, ReactNode } from "react";


export const TransactionTabTitle = (props: { children: ReactNode }) => {
    return (
        <Tab as={ Fragment }>
            {
                ({ selected }) => (
                    <button className={`      
                        w-full                  
                        px-2
                        pt-2
                        pb-5                      
                        font-light
                        text-center                        
                        text-sm
                        border-0                        
                        outline-none
                        ${selected ? "border-b-[0.3px]": "border-b-0" }
                        ${selected ? "text-white": "text-zinc-200"}                        
                        `}
                    >
                        { props.children }
                    </button> 
                )
            }
        </Tab>
    );
}
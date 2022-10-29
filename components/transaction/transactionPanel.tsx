import { ReactNode } from "react";


export const TransactionPanel = (props: {children: ReactNode}) => {
    return (
        <div className="
            py-4 
            px-4 
            w-full
            h-full
            flex flex-col justify-start items-start gap-4
            "
        >
            { props.children }
        </div>
    );
}
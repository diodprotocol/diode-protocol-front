import { ReactNode } from "react";
import { ShowIcon } from "./transactionIcon";


interface PropsTransactionButton {
    isError?: boolean;
    isWaiting?: boolean;
    isSuccess?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    children?: ReactNode;
    bgSecondary?: boolean;
}

export const TransactionButton = (props: PropsTransactionButton) => {
    return (
        <button 
            className={
                `
                w-full 
                py-2
                px-2
                relative 
                flex justify-center 
                text-sm 
                text-left                 
                font-light
                border
                border-zinc-200
                border-[0.2px]
                rounded-md
                ${ (props.bgSecondary) ? "bg-purple-400/60" : "bg-zinc-900" } hover:bg-orange-400/60
                `}
            onClick={ props.onClick }
            disabled={ props.disabled }
        >

            <div className="w-full flex justify-center items-center">
                { props.children }
            </div>

            {
                ( props.disabled ) ? null :
                <div className="absolute right-5 top-1/4">
                    <ShowIcon
                        isError={ props.isError }
                        isWaiting={ props.isWaiting }
                        isSuccess={ props.isSuccess }
                    />
                </div>

            }

        </button>
    );
}
interface PropsInfoDiv {
    label: string;
    value: string;
};

export const TransactionInfo = (props: PropsInfoDiv) => {
    return (    
        <div className="
            w-full 
            px-4 
            py-2 
            flex flex-row justify-between items-center gap-4
            text-sm
            text-zinc-200
            font-light
            rounded-md 
            border 
            border-zinc-600
            "
        >
            <div>
                { props.label }
            </div>
            <div>
                { props.value } 
            </div>
        </div>
    );
}

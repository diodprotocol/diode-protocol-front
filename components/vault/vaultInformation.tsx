export const VaultInformationItem = (props: {label: string, name: string}) => {
    return (
        <div className="
            py-3
            px-4
            h-full
            w-full            
            flex flex-col justify-start items-start gap-2
            "
        >

            <div className="text-xs text-zinc-400 font-sans font-light">
                { props.label }
            </div>

            <div className="text-lg text-zinc-200 font-sans font-light">
                { props.name }
            </div>

        </div>
    )
}

export const VaultInformation = () => {
    const timestamp = new Date();
    return (
        <div className="
            w-full
            h-full
            flex flex-col justify-start items-start 
            divide-y-[0.2px] divide-zinc-200
            "
        >

            <VaultInformationItem
                label="Contract start"
                name={ timestamp.toDateString() }
            />
            
            <VaultInformationItem
                label="Contract end"
                name={ timestamp.toDateString() }
            />

            <VaultInformationItem
                label="Contract end"
                name={ timestamp.toDateString() }
            />            

            <VaultInformationItem
                label="Strike price"
                name={ "ToDo" }
            />

            <VaultInformationItem
                label="Delta price"
                name={ "Todo"}
            />

        </div>
    );
}
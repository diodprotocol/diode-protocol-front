interface PropsButton {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    wfull?: boolean;
}

export const Button = (props: PropsButton) => {
    return (
        <button 
            className={`
                ${( props.wfull) ? "w-full" : "" }
                px-4 
                py-1                
                flex flex-row items-center justify-center gap-2
                text-sm
                text-zinc-200 hover:text-white
                font-sans
                font-light hover:font-normal
                bg-violet-600/80 hover:bg-violet-600/70
                rounded-md
                `}      
            onClick={ props.onClick }
            disabled={ props.disabled }
            type="button"
        >
            { props.children }
        </button>
    );  
}

export const HoverButton = (props: PropsButton) => {
    return (
        <button 
            className="
                px-4 py-1                
                flex flex-row items-center justify-center gap-2
                bg-zinc-900 hover:bg-violet-600/70
                text-sm
                text-zinc-200 hover:text-white
                font-sans
                font-light
                rounded-md
                border
                border-[0.1px]
                border-zinc-600
                "
            onClick={ props.onClick }
            disabled={ props.disabled }
            type="button"
        >
            { props.children }
        </button>
    );  
}

export const DarkButton = (props: PropsButton) => {
    return (
        <button 
            className={`
                ${( props.wfull) ? "w-full" : "" }
                px-4 
                py-1
                flex flex-row items-center justify-center gap-2                
                bg-zinc-900 hover:bg-zinc-800/60
                text-sm
                text-zinc-200 hover:text-white
                font-sans
                font-light
                rounded-md
                border
                border-[0.2px]
                border-zinc-600
            `}                
            onClick={ props.onClick }
            disabled={ props.disabled }
            type="button"
        >
            { props.children }
        </button>
    );  
}
interface PropsButton {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

export const Button = (props: PropsButton) => {
    return (
        <button 
            className="
                px-4 py-1
                font-semibold
                rounded-md
                text-sm
                text-zinc-200 hover:text-white
                bg-orange-400/50 hover:bg-orange-400/60
                flex flex-row items-center justify-start gap-2                
                "
                // transition ease-in-out duration-150 hover:scale-105
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
            className="
                px-4 py-1
                font-semibold
                rounded-md
                border
                border-zinc-500
                text-sm
                text-zinc-200 hover:text-white
                bg-zinc-900 hover:bg-zinc-800/60
                flex flex-row items-center justify-start gap-2
                "
                // transition ease-in-out duration-150 hover:scale-105
            onClick={ props.onClick }
            disabled={ props.disabled }
            type="button"
        >
            { props.children }
        </button>
    );  
}
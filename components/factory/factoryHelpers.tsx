import { ReactNode, Dispatch } from "react";
import { Button, DarkButton } from "../common/button";


export const FactoryAction = (props: { children: ReactNode }) => {
    return (
        <div className="py-[0.5px] text-sm font-sans font-light">
            { props.children }
        </div>
    );
}


export const FactoryTip = (props: { children: ReactNode }) => {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-2 text-sm text-slate-200 italic">                        
            { props.children }
        </div>
    )
}


export const FactoryButton = (props: { children: ReactNode, onClick: () => void, disabled?: boolean }) => {
    if (props.disabled) {
        return (
            <DarkButton 
                onClick={ props.onClick } 
                disabled={ props.disabled }
                wfull={ true }
            >
                { props.children }                
            </DarkButton>
        );
    }
    return (
        <Button
            onClick={ props.onClick } 
            disabled={ props.disabled }
            wfull={ true }
        > 
                { props.children }            
        </Button>
    );
}


export const FactoryButtonWrapper = (props: { children: ReactNode }) => {
    return (
        <div className="w-full flex flex-row gap-4">
            { props.children }
        </div>
    );
}

export const FactoryReviewItem = (props: {name: string, value: string}) => {
    return (
        <div className="py-1 w-full flex flex-row justify-between items-center text-sm bg-zinc-900">
            <div className="pl-4 py-1 min-w-fit text-left ">
                { props.name }
            </div>
            <div className="pr-4 py-1 w-full text-right">
                { props.value }
            </div>
        </div>
    );
}


interface PropsContestFactoryInput {
    title?: string;
    placeholder?: string;
    value: string;
    setValue?: Dispatch<string>;
    unit: string;
    type?: string;
    min?: string;
    step?: string; 
}


export const FactoryInput = (props: PropsContestFactoryInput) => {
    return (
        <div className="w-full text-zinc-100 text-base flex flex-col justify-start items-start">
            <div className="h-11 w-full relative bg-zinc-900 rounded-lg text-zinc-100 pl-2 pr-4 py-1 text-sm flex flex-row justify-start items-center">
                <div className="min-w-fit pl-2 top-1/4 right-5 font-light text-sm font-sans">
                    { props.title }
                </div>
                
                <input 
                    className="w-full flex justify-center outline-none bg-transparent text-right text-sm font-light font-sans"
                    placeholder={ props.placeholder }
                    min={ props.min }
                    step={ props.step }
                    type={ props.type }
                    value={ props.value }
                    onChange={ props.setValue ? (event) => props.setValue!(event.target.value) : undefined }
                />
                
                <div className="absolute min-w-fit px-4 top-1/4 right-5 italic">
                    { props.unit }
                </div>

            </div>
        </div>
    );
}
import { ReactNode } from "react";
import { Button } from "./button";


export const ChooseButton = (props: { children: ReactNode, onClick: () => void}, index: number) => {
    return (
        <Button
            key={ index }
            onClick={ props.onClick }
        >
            <div className="">
                { props.children }
            </div>
        </Button>
    );
}

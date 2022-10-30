import { Dispatch, useEffect, useState } from "react";
import { FactoryAction } from "./factoryHelpers";
import DatePicker from "react-datepicker";


interface PropsFactoryChoosePeriod {
    timeStart?: string;
    setTimeStart?: Dispatch<string>;
    duration?: string;
    setDuration?: Dispatch<string>; 
}

export const FactoryChoosePeriod = (props: PropsFactoryChoosePeriod) => {

    const [startDate, setStartDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());

    useEffect(() => {
        if (!props.setTimeStart) return;
        if (!startDate) return;
        let startTimestamp = startDate.getTime()/1000;        
        props.setTimeStart(startTimestamp.toFixed(0))
    })

    useEffect(() => {
        if (!props.setDuration) return;
        if (!finalDate) return;
        let duration = (finalDate.getTime() - startDate.getTime())/1000;
        if (duration < 0) return;        
        props.setDuration(duration.toFixed(0));
    })

    return (
        <div className="pt-1 w-full flex flex-col gap-2">

            <FactoryAction>
                When the contract should start
            </FactoryAction>

            <div className="h-11 w-full flex flex-row justify-between items-center gap-2 rounded-md bg-zinc-900 px-2 py-1">
                
                <div className="w-full flex">
                    <FactoryAction>
                        Start date                        
                    </FactoryAction>
                </div>

                <div className="w-full flex">
                    <DatePicker
                        selected={ startDate } 
                        onChange={ (date: Date) => setStartDate(date) } 
                        customInput={<input className="w-full bg-zinc-900 text-sm font-light font-sans text-right outline-none"/>}
                    />
                </div>

            </div>

            <FactoryAction>
                When the contract should end
            </FactoryAction>

            <div className="h-11 w-full flex flex-row justify-between items-center gap-2 rounded-md bg-zinc-900 px-2 py-1">

                <div className="w-full">
                    <FactoryAction>
                        End date
                    </FactoryAction>
                </div>

                <div className="w-full">
                    <DatePicker 
                        selected={ finalDate }
                        onChange={ (date: Date) => setFinalDate(date) }
                        customInput={<input className="w-full bg-zinc-900 text-sm font-light font-sans text-right outline-none"/>}
                    />
                </div> 

            </div>


        </div>

    );
}

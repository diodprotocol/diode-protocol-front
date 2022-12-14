import { Fragment, ReactNode } from "react";
import { Tab } from "@headlessui/react";


export const TabPanel = (props: { children: ReactNode }) => {
    return (
        <Tab.Panel as={ Fragment }>
            <div className="h-full px-4 py-2 w-full rounded-lg text-zinc-200 mx-auto">
                { props.children }
            </div>
        </Tab.Panel>
    )
}

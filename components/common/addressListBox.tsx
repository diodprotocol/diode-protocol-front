import { Fragment, useState, Dispatch, useEffect } from "react";
import truncateEthAddress from "truncate-eth-address";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { Asset } from "../interface/asset";


export const AddressListbox = (props: { listOfAddress: Array<Asset>, setAssetAddress?: Dispatch<string> }) => {
    
    const [selected, setSelected] = useState<Asset>();
    
    useEffect(() => {
        if (!props.setAssetAddress) return ;
        if (!selected) return;
        props.setAssetAddress(selected.address);
    }, [ selected ]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="w-full">
            <Listbox 
                value={ selected }
                onChange={ setSelected }
            >
                <div className="relative mt-1">

                    <Listbox.Button
                        className="     
                            h-10                       
                            w-full 
                            relative
                            py-2
                            pl-3 pr-10 
                            cursor-default 
                            rounded-lg 
                            bg-zinc-900 
                            text-center
                            text-sm
                            "
                    >
                        <span className="block truncate">
                            { (!selected) ? null : `${ selected.name } (${ selected.address })` }
                        </span>

                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>

                    </Listbox.Button>

                    <Transition
                        as={ Fragment }
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >

                        <Listbox.Options
                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-zinc-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
                        >
                            {
                                props.listOfAddress.map((asset, item) => (
                                    <Listbox.Option
                                        key={ item }
                                        className={ ({active}) => `
                                            relative 
                                            cursor-default 
                                            select-non 
                                            py-2 pl-10 pr-4
                                            text-xs
                                            ${active ? 'bg-zinc-600 text-white' : 'text-zinc-100'}
                                            `
                                        }
                                        value={ asset }
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    { `${ asset.name } (${ asset.address })` }
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon className="h-5 w-5 text-zinc-100" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))
                            }
                    
                        </Listbox.Options>


                    </Transition>

                </div>

            </Listbox>

        </div>
    );
}

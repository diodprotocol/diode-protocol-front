import { useContractFactoryAbi } from './useContractFactoryAbi';
import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";


interface QueryContractFactoryRead {
    value?: string;
    isLoading: boolean;
    isError: boolean;
    isRefetching: boolean;
    refetch: () => void;
}

export const useContractFactoryRead = (contractAddress: string, functionName: string, args?: Array<string>|undefined): QueryContractFactoryRead => {

    const [ value, setValue ] = useState<string>();
    const { contractAbi } = useContractFactoryAbi(); 

    const { data, isLoading, isError, isRefetching, refetch } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: functionName,
        args: args,
        cacheOnBlock: false,
    });

    useEffect(() => {
        if (data) setValue(data.toString()) ;
    }, [ data ])

    return { value, isLoading, isError, isRefetching, refetch };
}

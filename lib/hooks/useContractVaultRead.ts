import { BigNumber } from "ethers";
import { useState, useEffect } from "react";
import { useContractVaultAbi } from "./useContractVaultAbi";
import { useContractRead } from "wagmi";


interface ParamsContractVaultRead {
    contractAddress: string;
    functionName: string;
    args?: Array<string>|undefined;
}

interface QueryContractVaultRead {
    value?: string;
    isLoading: boolean;
    isError: boolean;
    isRefetching: boolean;
    refetch: () => void;
}

export const useContractVaultRead = (contractAddress: string, functionName: string, args?: Array<string>|undefined): QueryContractVaultRead => {

    const [ value, setValue ] = useState<string>();
    const { contractAbi } = useContractVaultAbi(); 

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

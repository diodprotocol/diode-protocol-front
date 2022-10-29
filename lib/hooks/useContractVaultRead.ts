import { BigNumber } from "ethers";
import { useState } from "react";
import { useContractVaultAbi } from "./useContractVaultAbi";
// import { useContractRead } from "wagmi";


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

const useContractVaultRead = (params: ParamsContractVaultRead): QueryContractVaultRead => {

    const [ value, setValue ] = useState<string>();
    const { contractAbi } = useContractVaultAbi();

    // const { data, isLoading, isError, isRefetching, refetch } = useContractRead({
    //     addressOrName: contractAddress,
    //     contractInterface: contractAbi,
    //     functionName: functionName,
    //     args: args,
    //     cacheOnBlock: true,
    // });

    let isLoading = false;
    let isError = false;
    let isRefetching = false;
    let refetch = () => console.log("refetch");

    // useEffect(() => {
    //     if (data) setValue(data.toString()) ;
    // }, [ data ])

    return { value, isLoading, isError, isRefetching, refetch };
}

export const useContractVaultReadAsset = (contractAddress: string): QueryContractVaultRead => {
    return useContractVaultRead({contractAddress: contractAddress, functionName: "asset"});
}

export const useContractVaultReadBalanceOf = (contractAddress: string): QueryContractVaultRead => {
    return useContractVaultRead({contractAddress: contractAddress, functionName: "balanceOf"});
}

export const useContractVaultReadName = (contractAddress: string): QueryContractVaultRead => {
    return useContractVaultRead({contractAddress: contractAddress, functionName: "name"});
}

export const useContractVaultReadStrategy = (contractAddress: string): QueryContractVaultRead => {
    return useContractVaultRead({contractAddress: contractAddress, functionName: "strategy"});
}
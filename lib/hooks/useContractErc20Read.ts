import { BigNumber } from "ethers";
import { useState, useEffect } from "react";
import { useContractRead, erc20ABI } from "wagmi";
import { useContractErc20Abi } from "./useContractErc20Abi";


interface ParamsContractErc20Read {
    contractAddress: string;
    functionName: string;
    args?: Array<string>|undefined;
}

interface QueryContractErc20Read {
    value?: string;
    isLoading: boolean;
    isError: boolean;
    isRefetching: boolean;
    refetch: () => void;
}

const useContractErc20Read = (params: ParamsContractErc20Read): QueryContractErc20Read => {

    const [ value, setValue ] = useState<string>();
    const { contractAbi } = useContractErc20Abi();

    const { data, isLoading, isError, isRefetching, refetch } = useContractRead({
        addressOrName: params.contractAddress,
        contractInterface: contractAbi,
        functionName: params.functionName,
        args: params.args,
        cacheOnBlock: true,
    });

    useEffect(() => {
        if (data) setValue(data.toString()) ;
    }, [ data ])

    return { value, isLoading, isError, isRefetching, refetch };
}

export const useContractErc20ReadAllowance = (contractAddress: string, owner: string, spender: string): QueryContractErc20Read => {
    return useContractErc20Read({contractAddress: contractAddress, functionName: "allowance", args: [ owner, spender ]});
}

export const useContractErc20ReadAsset = (contractAddress: string): QueryContractErc20Read => {
    return useContractErc20Read({contractAddress: contractAddress, functionName: "asset"});
}

export const useContractErc20ReadBalanceOf = (contractAddress: string, address?: string): QueryContractErc20Read => {
    return useContractErc20Read({contractAddress: contractAddress, functionName: "balanceOf", args: [ address! ]});
}

export const useContractErc20ReadName = (contractAddress: string): QueryContractErc20Read => {
    return useContractErc20Read({contractAddress: contractAddress, functionName: "name"});
}

export const useContractErc20ReadSymbol = (contractAddress: string): QueryContractErc20Read => {
    return useContractErc20Read({contractAddress: contractAddress, functionName: "symbol"});
}

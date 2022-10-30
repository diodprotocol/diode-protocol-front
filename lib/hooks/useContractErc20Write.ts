import { useContractErc20Abi } from './useContractErc20Abi';
import { BigNumber } from "ethers";

import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";


const useContractErc20Write = (contractAddress: string, functionName: string, args?: Array<string>|undefined) => {
    const { contractAbi } = useContractErc20Abi();
    const { config } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: functionName,
        args: args,
        cacheTime: 10_000,
    })
    const writeContract = useContractWrite(config);
    const transaction = useWaitForTransaction({ hash: writeContract.data?.hash });
    return { writeContract, transaction };
}

export const useContractErc20WriteApprove = (contractAddress: string, spender: string, amount: BigNumber|undefined) => {
    return useContractErc20Write(contractAddress, "approve", [ spender, (amount) ? amount.toString() : "" ]);
}

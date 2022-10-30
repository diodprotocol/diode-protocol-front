import { BigNumber } from "ethers";
import { useContractVaultAbi } from "./useContractVaultAbi";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";


const useContractVaultWrite = (contractAddress: string, functionName: string, args?: Array<string>|undefined) => {
    const { contractAbi } = useContractVaultAbi();
    const { config } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: functionName,
        args: args,
        cacheTime: 10_000,
        overrides: {
            gasLimit: 1000000,
        },
    })
    const writeContract = useContractWrite(config);
    const transaction = useWaitForTransaction({ hash: writeContract.data?.hash });
    return { writeContract, transaction };
}

export const useContractVaultWriteDeposit = (contractAddress: string, amount: BigNumber|undefined, longShort: boolean) => {
    return useContractVaultWrite(contractAddress, "depositFunds", [ (amount) ? amount.toString() : "", longShort.toString() ]);
}
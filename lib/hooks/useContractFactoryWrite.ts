import { BigNumber } from "ethers";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { useContractFactoryAbi } from "./useContractFactoryAbi";


const useContractFactorytWrite = (contractAddress: string, functionName: string, args?: Array<string>|undefined) => {
    const { contractAbi } = useContractFactoryAbi();
    const { config } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: functionName,
        args: args,
        cacheTime: 10_000,
        overrides: {
            gasLimit: 10000000,
        },
    })
    const writeContract = useContractWrite(config);
    const transaction = useWaitForTransaction({ hash: writeContract.data?.hash });
    return { writeContract, transaction };
}

export const useContractFactorytWriteCreatePool = (
        contractAddress: string,
        strikePrice: BigNumber|undefined,
        asset: string,
        duration: string,
        startTime: string,
        deltaPrice: BigNumber|undefined,
        chainlinkPriceFeed: string,
        fees: string,
        name: string,
        symbol: string,
    ) => {
    return useContractFactorytWrite(
        contractAddress, 
        "deployDiodePool",
        [
            (strikePrice) ? strikePrice.toString() : "",
            asset,
            duration,
            startTime,
            (deltaPrice) ? deltaPrice.toString() : "",
            chainlinkPriceFeed,
            fees,
            name, 
            symbol,
        ]
        );
}
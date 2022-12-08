import { BigNumber } from "ethers";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { useContractFactoryAbi } from "./useContractFactoryAbi";


const useContractFactorytWrite = (contractAddress: string, functionName: string, args?: Array<Array<BigNumber>|BigNumber|string|Array<string>>) => {
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
        strikeDeltaFees?: [BigNumber, BigNumber, BigNumber],
        durationAndStart?: [BigNumber, BigNumber],
        capLongShort?: [BigNumber, BigNumber],
        asset?: string,
        chainlinkPriceFeed?: string,
        curveAddresses?: [string, string],
        beefyVault?: string,
        name?: string,
        symbol?: string,
    ) => {
    const args = [
        strikeDeltaFees!,
        durationAndStart!,
        capLongShort!,
        asset!,
        chainlinkPriceFeed!,
        curveAddresses!,
        beefyVault!,
        name!, 
        symbol!,
    ]
    console.log(args);
    return useContractFactorytWrite(
        contractAddress, 
        "deployDiodePool",
        args,
    );
}
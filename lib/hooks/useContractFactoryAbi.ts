import ContractJsonAbi from "../abi/contractFactoryAbi.json";


export interface PropsContractFactoryAbi {
    contractAbi: string;
}

export const useContractFactoryAbi = (): PropsContractFactoryAbi => {
    const contractAbi = JSON.stringify(ContractJsonAbi);
    return { contractAbi };
}

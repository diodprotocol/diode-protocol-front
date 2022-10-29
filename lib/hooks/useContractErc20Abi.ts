import ContractJsonAbi from "../abi/contractErc20.json";


export interface PropsContractErc20Abi {
    contractAbi: readonly string [];
}

export const useContractErc20Abi = (): PropsContractErc20Abi => {
    const contractAbi = JSON.parse(JSON.stringify(ContractJsonAbi));
    return { contractAbi };
}

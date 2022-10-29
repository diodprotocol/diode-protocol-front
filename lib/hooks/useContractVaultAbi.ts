import ContractJsonAbi from "../abi/contractVaultAbi.json";


export interface PropsContractVaultAbi {
    contractAbi: string;
}

export const useContractVaultAbi = (): PropsContractVaultAbi => {
    const contractAbi = JSON.stringify(ContractJsonAbi);
    return { contractAbi };
}

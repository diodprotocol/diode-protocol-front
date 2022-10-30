import { ethers, BigNumber } from "ethers";


export const helperFormatUnit = (value?: string, decimalsOrUnitName?: string): string => {
    if (!value || !decimalsOrUnitName) {
        return value!;
    } else {        
        return ethers.utils.formatUnits(value!, decimalsOrUnitName.toLocaleLowerCase());
    }
}

export const helperParseUnit = (value?: string, decimalsOrUnitName?: string): BigNumber => {
    if (!value || !decimalsOrUnitName) {
        return BigNumber.from("0");
    } else {
        try {
            return ethers.utils.parseUnits(value, decimalsOrUnitName.toLowerCase());
        } catch (e) {            
            return BigNumber.from("0");
        }
    }
}

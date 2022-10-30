import { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";

// import { 
//     useContractReadAsset, 
//     useContractReadBalanceOf, 
//     useContractReadPreviewRedeem 
// } from "../../hooks/useContractReadContest";

import { TransactionAddress } from "../transaction/transactionAddress";
import { TransactionButton } from "../transaction/transactionButton";
import { TransactionChooseRate } from "../transaction/transactionChooseRate";
import { TransactionChooseUnit } from "../transaction/transactionChooseUnit";
import { TransactionInfo } from "../transaction/transactionInfo";
import { TransactionInput } from "../transaction/transactionInput";
import { TransactionPanel } from "../transaction/transactionPanel";

import { helperFormatUnit, helperParseUnit } from "../../lib/utils/convertValueBasedOnUnit";


export const VaultWithdraw = (props: { contractAddress: string }) => {

    const { address } = useAccount();

    const [ unit, setUnit ] = useState<string>("ether");
    const [ userShares, setUserShares] = useState<string>("");
    const [ userSharesInWei, setUserSharesInWei] = useState<BigNumber>(BigNumber.from("0"));

    // const asset = useContractReadAsset(props.contractAddress);
    // const currentAssetBalance = useContractReadBalanceOf(asset.value!, address!);
    // const currentShareBalance = useContractReadBalanceOf(props.contractAddress, address!);
    // const maxRedeem = useContractReadMaxRedeem(props.contractAddress, address!);
    // const previewRedeem = useContractReadPreviewRedeem(props.contractAddress, userSharesInWei);
    // const { writeContract, transaction } = useContractWriteRedeem(props.contractAddress, userSharesInWei, address!, address!);

    const displayCurrentShareBalance = ""; //helperFormatUnit(currentShareBalance.value, unit);
    const displayPreviewRedeem = ""; //helperFormatUnit(previewRedeem.value, unit);
    const displaySimulatedAssetBalance = ""; 
    // (currentAssetBalance.value && previewRedeem.value ) ?    
    //     helperFormatUnit( (BigNumber.from(currentAssetBalance.value).add(BigNumber.from(previewRedeem.value!))).toString(), unit) : "";
    
    // useEffect(() => {
    //     setUserShares(helperFormatUnit(userSharesInWei.toString(), unit));
    // }, [ unit ])  // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     if (userShares) {
    //         setUserSharesInWei(helperParseUnit(userShares, unit));
    //     } else {
    //         setUserSharesInWei(BigNumber.from("0"));
    //     }
    // }, [userShares])  // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <TransactionPanel>

            <TransactionInfo label="Withdraw amount" value={ displayCurrentShareBalance } />

            <TransactionInfo label="Expected reward" value={ "" } />
                                                
            <TransactionButton
                // onClick={ (transaction.isSuccess) ? () => { writeContract.reset(); setUserShares(""); currentShareBalance.refetch() } : () => { writeContract.write?.() } }
                // disabled={ !writeContract.write }
                // isError={ writeContract.isError || transaction.isError }
                // isWaiting={ ( writeContract.isLoading || writeContract.isSuccess ) && transaction.isLoading }
                // isSuccess={ transaction.isSuccess }
            >
                Withdraw
            </TransactionButton>
        
        </TransactionPanel>        
    )
}

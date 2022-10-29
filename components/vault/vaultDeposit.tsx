import { useState, useEffect, ReactNode } from "react";
import { useAccount } from "wagmi";
import { BigNumber } from "ethers";
import { useDebounce } from "use-debounce";

import { TransactionAddress } from "../transaction/transactionAddress";
import { TransactionButton } from "../transaction/transactionButton";
import { TransactionChooseUnit } from "../transaction/transactionChooseUnit";
import { TransactionChooseRate } from "../transaction/transactionChooseRate";
import { TransactionInfo } from "../transaction/transactionInfo";
import { TransactionInput } from "../transaction/transactionInput";
import { TransactionPanel } from "../transaction/transactionPanel";

import { helperFormatUnit, helperParseUnit } from "../../lib/utils/convertValueBasedOnUnit";

import {
    useContractErc20ReadAllowance,
    useContractErc20ReadBalanceOf,
    useContractErc20ReadSymbol,
} from "../../lib/hooks/useContractErc20Read";


const ZeroActionButton = (props: { children: ReactNode }) => {
    return (
        <TransactionButton
            disabled={ false }
        >
            { props.children }
        </TransactionButton>
    );
}

const ApproveDepositButton = (props: { assetAddress: string, contractAddress: string, approveAmmount: BigNumber|undefined, onTransactionSucess: () => void, assetSymbol: string }) => {
    
    const [ debouncedApproveAmmount ] = useDebounce(props.approveAmmount, 1000);
    
    // const approve = useContractWriteApprove(props.assetAddress, props.contractAddress, debouncedApproveAmmount);
    // useEffect(() => {
    //     if (approve.transaction.isSuccess) {
    //         props.onTransactionSucess();
    //     }
    // }, [ approve.transaction.isSuccess ]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <TransactionButton
            // onClick={ () => approve.writeContract.write?.() }
            // disabled={ !approve.writeContract.write }
            // isError={ approve.writeContract.isError || approve.transaction.isError }
            // isWaiting={ ( approve.writeContract.isLoading || approve.writeContract.isSuccess ) && approve.transaction.isLoading }
            // isSuccess={ approve.transaction.isSuccess }
        >
            { `Authorize deposit for ${ props.assetSymbol }` }
        </TransactionButton>
    );
}

const DepositButton = (props: { contractAddress: string, depositAmount: BigNumber|undefined, receiverAddress: string, clearDepositAmount: () => void }) => {

    // const [ debouncedDepositAmount ] = useDebounce(props.depositAmount, 1000);
    // const deposit = useContractWriteDeposit(props.contractAddress, debouncedDepositAmount, props.receiverAddress);

    // useEffect(() => {
    //     if (deposit.transaction.isSuccess) {
    //         props.clearDepositAmount();
    //     }
    // }, [ deposit.transaction.isSuccess ]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <TransactionButton
            // onClick={ () => deposit.writeContract.write?.()  }
            // disabled={ false }
            // isError={ deposit.writeContract.isError || deposit.transaction.isError }
            // isWaiting={ ( deposit.writeContract.isLoading || deposit.writeContract.isSuccess ) && deposit.transaction.isLoading }
            // isSuccess={ deposit.transaction.isSuccess }
        >
            Deposit
        </TransactionButton>
    );
}

const DepositLogic = (props: { contractAddress: string, depositAmount: BigNumber|undefined, clearDepositAmount: () => void }) => {

    const { address } = useAccount();
    
    // useContractReadAsset(props.contractAddress);
    const asset = "0x1643e812ae58766192cf7d2cf9567df2c37e9b7f";        
    const currentAssetAllowance = useContractErc20ReadAllowance(asset, address!, asset);
    const currentAssetBalance = useContractErc20ReadBalanceOf(asset, address!);
    const currentAssetSymbol = useContractErc20ReadSymbol(asset);
    
    let shouldFirstApprove: boolean|undefined;
    
    if ( !props.depositAmount || !currentAssetBalance.value || props.depositAmount.eq(BigNumber.from("0")) ) { 
        return (
            <ZeroActionButton > 
                Enter deposit amount
            </ZeroActionButton>
        );
    }

    if ( BigNumber.from(currentAssetBalance.value).lt(props.depositAmount) ) {
        return (
            <ZeroActionButton > 
                { `Insufficient funds for ${ currentAssetSymbol.value }` }
            </ZeroActionButton>
        );
    }

    if ( asset !== undefined && currentAssetAllowance.value !== undefined ) {
        const allowanceInWei = BigNumber.from(currentAssetAllowance.value);
        if ( props.depositAmount.gt(allowanceInWei) ) {
            shouldFirstApprove = true;
        } else {
            shouldFirstApprove = false;
        }
    }

    if ( shouldFirstApprove === true) {
        return (
            <ApproveDepositButton
                assetAddress={ asset }
                contractAddress={ props.contractAddress }
                approveAmmount={ props.depositAmount.add(BigNumber.from("1")) }
                onTransactionSucess={ () => currentAssetAllowance.refetch() }
                assetSymbol={ currentAssetSymbol.value! }
            />
        );
    } else if (shouldFirstApprove === false ) { 
        return (
            <DepositButton
                contractAddress={ props.contractAddress }
                depositAmount={ props.depositAmount! }
                receiverAddress={ address! }
                clearDepositAmount={ props.clearDepositAmount }
            />
        );
    } else {
        return (
            <TransactionButton
                onClick={ () => console.log("waiting") }
                disabled={ false }
                isError={ false }
                isWaiting={ false }
                isSuccess={ false }
            >
                Waiting
            </TransactionButton>
        );
    }
}

export const VaultDeposit = (props: { contractAddress: string }) => {

    const { address } = useAccount();

    const [ unit, setUnit ] = useState<string>("ether");
    const [ userAssets, setUserAssets] = useState<string>("");
    const [ userAssetsInWei, setUserAssetsInWei] = useState<BigNumber>(BigNumber.from("0"));
    const [ debounceUserAssetsInWei ] = useDebounce(userAssetsInWei, 2000);

    const asset = "0x1643e812ae58766192cf7d2cf9567df2c37e9b7f"; // useContractReadAsset(props.contractAddress);
    
    const currentAssetBalance = useContractErc20ReadBalanceOf(asset, address!);
    console.log("currentAssetBalance", currentAssetBalance);

    // const previewDeposit = useContractReadPreviewDeposit(props.contractAddress, (debounceUserAssetsInWei) ? debounceUserAssetsInWei : undefined);
    // const depositConvertToShare = useContratReadConvertToShares(props.contractAddress, (debounceUserAssetsInWei) ? debounceUserAssetsInWei : undefined);
    
    const displayCurrentAssetBalance = helperFormatUnit(currentAssetBalance.value, unit);
    const displayReceivedShares = ""; //helperFormatUnit(depositConvertToShare.value, unit);
    const displayFutureShareBalance = ""; //(currentShareBalance.value && previewDeposit.value ) ?
        // helperFormatUnit( (BigNumber.from(currentShareBalance.value).add(BigNumber.from(previewDeposit.value!))).toString(), unit) : "";

    const changeRate = (item: number): string => {
        if (!currentAssetBalance.value) return "";
        const multiplier = BigNumber.from(item);
        const divider = BigNumber.from(100);
        const newUserAssetsInWei = BigNumber.from(currentAssetBalance.value!).mul(multiplier).div(divider);
        return helperFormatUnit(newUserAssetsInWei.toString(), unit);
    }

    useEffect(() => {
        setUserAssets(helperFormatUnit(userAssetsInWei.toString(), unit));
    }, [ unit ])  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (userAssets) {
            setUserAssetsInWei(helperParseUnit(userAssets, unit));
        } else {
            setUserAssetsInWei(BigNumber.from("0"));
        }
    }, [ userAssets ])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <TransactionPanel>

            <TransactionInfo label="Current Asset balance" value={ displayCurrentAssetBalance } />

            <div className="w-full rounded-lg bg-zinc-800 relative">
                <div className="w-full flex justify-center items-center">
                    <TransactionInput
                        value={ userAssets }
                        setValue={ (event) => setUserAssets( event.target.value ) }
                    />
                </div>
                <button 
                    className="absolute w-20 text-center text-xs font-light border rounded-md border-zinc-200 right-5 top-1/4"
                    onClick={ () => setUserAssets((Number(displayCurrentAssetBalance)).toString()) }
                >
                    Max
                </button>
            </div>

            <TransactionChooseRate setRate={(item) => setUserAssets(changeRate(item)) }/>
            
            <div className="w-full flex flex-row justify-between items-center text-normal text-left font-semibold gap-2">
                <TransactionChooseUnit setUnit={ setUnit } currentUnit= { unit }/>
                <TransactionAddress address={ props.contractAddress } label="Vault" />
            </div>
                                    
            <DepositLogic 
                contractAddress={ props.contractAddress }
                depositAmount={ debounceUserAssetsInWei }
                clearDepositAmount={ () => setUserAssets("0") }
            />
           
        </TransactionPanel>        
    );
}
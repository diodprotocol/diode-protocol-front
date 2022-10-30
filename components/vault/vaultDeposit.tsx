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
import { useContractVaultRead } from "../../lib/hooks/useContractVaultRead";
import { useContractErc20WriteApprove } from "../../lib/hooks/useContractErc20Write";
import { useContractVaultWriteDeposit } from "../../lib/hooks/useContractVaultWrite";
import { TransactionChooseLongShort } from "../transaction/transactionChooseLongShort";


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
    
    const approve = useContractErc20WriteApprove(props.assetAddress, props.contractAddress, debouncedApproveAmmount);
    useEffect(() => {
        if (approve.transaction.isSuccess) {
            props.onTransactionSucess();
        }
    }, [ approve.transaction.isSuccess ]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <TransactionButton
            onClick={ () => approve.writeContract.write?.() }
            disabled={ !approve.writeContract.write }
            isError={ approve.writeContract.isError || approve.transaction.isError }
            isWaiting={ ( approve.writeContract.isLoading || approve.writeContract.isSuccess ) && approve.transaction.isLoading }
            isSuccess={ approve.transaction.isSuccess }
        >
            { `Authorize deposit for ${ props.assetSymbol }` }
        </TransactionButton>
    );
}

const DepositButton = (props: { contractAddress: string, depositAmount: BigNumber|undefined, clearDepositAmount: () => void, position: string }) => {

    const [ debouncedDepositAmount ] = useDebounce(props.depositAmount, 1000);
    const deposit = useContractVaultWriteDeposit(props.contractAddress, debouncedDepositAmount, props.position === "long");

    useEffect(() => {
        if (deposit.writeContract.isIdle) {
            deposit.writeContract.reset();
        }
        if (deposit.transaction.isSuccess) {
            props.clearDepositAmount();
        }
    }, [ deposit.transaction.isSuccess ]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <TransactionButton
            onClick={ () => deposit.writeContract.write?.()  }
            disabled={ false }
            isError={ deposit.writeContract.isError || deposit.transaction.isError }
            isWaiting={ ( deposit.writeContract.isLoading || deposit.writeContract.isSuccess ) && deposit.transaction.isLoading }
            isSuccess={ deposit.transaction.isSuccess }
        >
            Deposit
        </TransactionButton>
    );
}

const DepositLogic = (props: { contractAddress: string, depositAmount: BigNumber|undefined, clearDepositAmount: () => void, position: string }) => {

    const { address } = useAccount();
        
    const asset = useContractVaultRead(props.contractAddress, "suppliedAsset");
    const currentAssetAllowance = useContractErc20ReadAllowance(asset.value!, address!, props.contractAddress);
    const currentAssetBalance = useContractErc20ReadBalanceOf(asset.value!, address!);
    const currentAssetSymbol = useContractErc20ReadSymbol(asset.value!);
    
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
                assetAddress={ asset.value! }
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
                clearDepositAmount={ props.clearDepositAmount }
                position={ props.position }
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
    const [ position, setPosition ] = useState<string>("long");

    const [ userAssets, setUserAssets] = useState<string>("");
    const [ userAssetsInWei, setUserAssetsInWei] = useState<BigNumber>(BigNumber.from("0"));
    const [ debounceUserAssetsInWei ] = useDebounce(userAssetsInWei, 2000);

    const asset = useContractVaultRead(props.contractAddress, "suppliedAsset");
    const currentAssetBalance = useContractErc20ReadBalanceOf(asset.value!, address!);    
    const displayCurrentAssetBalance = helperFormatUnit(currentAssetBalance.value!, unit);
            
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
                <TransactionChooseLongShort setPosition={ setPosition } currentPosition={ position } />                
            </div>
                                    
            <DepositLogic
                contractAddress={ props.contractAddress }
                depositAmount={ debounceUserAssetsInWei }
                position={ position }
                clearDepositAmount={ () => setUserAssets("0") }
            />
           
        </TransactionPanel>        
    );
}
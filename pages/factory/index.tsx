import { BigNumber, ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { useNetwork } from "wagmi";
import { DarkButton } from "../../components/common/button";
import { Page } from "../../components/common/page";
import { FactoryChooseBeefyVault } from "../../components/factory/factoryChooseBeefyVault";
import { FactoryChooseCapLongShort } from "../../components/factory/factoryChooseCapLongShort";
import { FactoryChooseNameAndSymbol } from "../../components/factory/factoryChooseNameAndSymbol";
import { FactoryChoosePeriod } from "../../components/factory/factoryChoosePeriod";
import { FactoryChooseAssetPool } from "../../components/factory/factoryChoosePoolAsset";
import { FactoryChoosePriceFeed } from "../../components/factory/factoryChoosePriceFeed";
import { FactoryChooseStrategy } from "../../components/factory/factoryChooseStrategy";
import { FactoryChooseStrikePrice } from "../../components/factory/factoryChooseStrikePrice";
import { FactoryButton } from "../../components/factory/factoryHelpers";
import { TransactionButton } from "../../components/transaction/transactionButton";
import { useContractFactorytWriteCreatePool } from "../../lib/hooks/useContractFactoryWrite";
import { helperFormatUnit, helperParseUnit } from "../../lib/utils/convertValueBasedOnUnit";
import { FactoryChooseAddress } from "../../components/factory/factoryChooseAddress";
import { supportedCurveLp, supportedCurvePool } from "../../components/constants";

const PageFactory = () => {

    const router = useRouter();
    const network = useNetwork();

    let factoryAddress: string;
    if (network.chain?.name === "Polygon") {
        factoryAddress = process.env.NEXT_PUBLIC_FACTORY_VAULT!;
    } else {
        factoryAddress = process.env.NEXT_PUBLIC_FACTORY_VAULT_POLYGON!;
    }
    
    const [ name, setName] = useState<string>("");
    const [ symbol, setSymbol] = useState<string>("");

    const [ assetPool, setAssetPool ] = useState<string>("");
    const [ priceFeed, setPriceFeed ] = useState<string>("");
    const [ curvePool, setCurvePool ] = useState<string>("");
    const [ curveLp, setCurveLp ] = useState<string>("");
    const [ beefyVault, setBeefyVault ] = useState("");
    
    const [ timeStart, setTimeStart ] = useState<string>("0");
    const [ duration, setDuration ] = useState<string>("0");

    const [ strikePrice, setStrikePrice ] = useState<string>("");
    const [ deltaPrice, setDeltaPrice ] = useState<string>("");
    const [ fee, setFee ]= useState<string>("0");

    const [ maxCapLong, setMaxCapLong ] = useState("");
    const [ maxCapShort, setMaxCapShort ] = useState("");
    
    const { transaction, writeContract } = useContractFactorytWriteCreatePool(
        factoryAddress,
        [
            helperParseUnit(strikePrice, "Gwei"),
            helperParseUnit(deltaPrice, "Gwei"),
            fee ? ethers.utils.parseUnits(Number(fee).toFixed(2), 2) : BigNumber.from(0),
        ],
        [
            BigNumber.from(timeStart),
            BigNumber.from(duration)
        ],
        [
            helperParseUnit(maxCapLong, "Gwei"),
            helperParseUnit(maxCapShort, "Gwei")
        ],
        assetPool,
        priceFeed,
        [
            curvePool,
            curveLp,
        ],
        beefyVault,
        name,
        symbol, 
    );

    return (
        <Page>
        
            <div className="w-full flex flex-col justify-start items-start gap-6">
                
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="text-2xl font-sans font-light">
                        Pool factory
                    </div>
                    <DarkButton
                        onClick={() => router.push("/") }
                    >                        
                        Back to vaults
                    </DarkButton> 
                </div>

                    <div className="
                        pt-8
                        w-full
                        max-w-xl    
                        mx-auto
                        flex flex-col justify-start items-start gap-2
                        "
                    >

                        <div className="
                            px-4
                            py-4
                            w-full
                            bg-gradient-to-r from-zinc-800 to-zinc-800
                            rounded-md
                            border
                            border-[0.2px]
                            border-zinc-600
                            "
                        >
                            <FactoryChooseNameAndSymbol
                                name={ name }
                                setName={ setName }
                                symbol={ symbol }
                                setSymbol={ setSymbol }
                            />
                        </div>

                        <div className="
                            px-4
                            py-4
                            w-full
                            flex flex-col justify-start items-start gap-2
                            rounded-md
                            border
                            border-[0.2px]
                            border-zinc-600
                            bg-zinc-800
                            "
                        >
                            <FactoryChooseAssetPool 
                                assetPool={ assetPool }
                                setAssetPool={ setAssetPool }
                            />
                    
                            <FactoryChoosePriceFeed 
                                priceFeed={ priceFeed }
                                setPriceFeed={ setPriceFeed }
                            />

                            <FactoryChooseAddress
                                title="Choose the curve pool"
                                choices={ supportedCurvePool }
                                setAddress={ setCurvePool }
                            />

                            <FactoryChooseAddress
                                title="Choose the curve LP Token"
                                choices={ supportedCurveLp }
                                setAddress={ setCurveLp }
                            />                            

                            <FactoryChooseBeefyVault
                                setAddress={ setBeefyVault }
                            />
                            
                        </div>
            
                        <div className="
                            px-4
                            py-4
                            w-full
                            bg-gradient-to-r from-zinc-800 to-zinc-800
                            rounded-md
                            border
                            border-[0.2px]
                            border-zinc-600
                            "
                        >
                            <FactoryChooseStrikePrice
                                strikePrice={ strikePrice }
                                setStrikePrice={ setStrikePrice }
                                deltaPrice={ deltaPrice }
                                setDeltaPrice={ setDeltaPrice }
                                fee={ fee }
                                setFee={ setFee }
                            />
                        </div>

                        <div className="
                            px-4
                            py-4
                            w-full
                            bg-gradient-to-r from-zinc-800 to-zinc-800
                            rounded-md
                            border
                            border-[0.2px]
                            border-zinc-600
                            "
                        >
                            <FactoryChooseCapLongShort
                                maxCapLong={ maxCapLong }
                                setMaxCapLong={ setMaxCapLong }
                                maxCapShort={ maxCapShort }
                                setMaxCapShort={ setMaxCapShort }
                            />
                        </div>

                        <div className="
                            px-4
                            py-4
                            w-full
                            bg-zinc-800            
                            rounded-md
                            border
                            border-[0.2px]
                            border-zinc-600
                            "
                        >
                            <FactoryChoosePeriod
                                timeStart={ timeStart }
                                setTimeStart={ setTimeStart }
                                duration={ duration }
                                setDuration={ setDuration }
                            />
                        </div>

                        <TransactionButton
                            //onClick={ (transaction.isSuccess) ? () => { writeContract.reset() } : () => { writeContract.write?.() } }
                            onClick={ (transaction.isSuccess) ? () => { writeContract.reset() } : () => { alert(writeContract.data) } }
                            disabled={ !writeContract.write }
                            isError={ writeContract.isError || transaction.isError }
                            isWaiting={ ( writeContract.isLoading || writeContract.isSuccess ) && transaction.isLoading }
                            isSuccess={ transaction.isSuccess }
                            bgSecondary={ true }
                        >
                            Create Pool
                        </TransactionButton>
                    
                    </div>

                </div>

        </Page>             
    );
}

export default PageFactory;

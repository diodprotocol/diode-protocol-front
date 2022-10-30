import { useRouter } from "next/router";
import { useState } from "react";
import { DarkButton } from "../../components/common/button";
import { Page } from "../../components/common/page";
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


const PageFactory = () => {

    const router = useRouter();
    
    const [ name, setName] = useState<string>("");
    const [ symbol, setSymbol] = useState<string>("");

    const [ assetPool, setAssetPool ] = useState<string>("");
    const [ priceFeed, setPriceFeed ] = useState<string>("");
    const [ strategy, setStrategy ] = useState<string>("");
    
    const [ timeStart, setTimeStart ] = useState<string>("0");
    const [ duration, setDuration ] = useState<string>("");
    const [ strikePrice, setStrikePrice ] = useState<string>("");
    const [ deltaPrice, setDeltaPrice ] = useState<string>("");

    const { transaction, writeContract } = useContractFactorytWriteCreatePool(
        process.env.NEXT_PUBLIC_FACTORY_VAULT!,
        helperParseUnit(strikePrice, "Gwei"),
        assetPool,
        duration,
        timeStart,
        helperParseUnit(deltaPrice, "Gwei"),
        priceFeed,
        "0",
        name,
        symbol        
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
                    w-full                    
                    flex flex-row items-stretch gap-2
                    "
                >
                    <div className="
                        w-full
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
                            border-zinc-200
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
                            border-zinc-200
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

                            <FactoryChooseStrategy 
                                strategy={ strategy }
                                setStrategy={ setStrategy }
                            />                        
                            
                        </div>

                    </div>
 
                    <div className="w-full flex flex-col justify-start items-start gap-2 ">

                            <div className="
                                px-4
                                py-4
                                w-full
                                bg-gradient-to-r from-zinc-800 to-zinc-800
                                rounded-md
                                border
                                border-[0.2px]
                                border-zinc-200
                                "
                            >
                                <FactoryChooseStrikePrice
                                    strikePrice={ strikePrice }
                                    setStrikePrice={ setStrikePrice }
                                    deltaPrice={ deltaPrice }
                                    setDeltaPrice={ setDeltaPrice }
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
                            border-zinc-200
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
                            onClick={ (transaction.isSuccess) ? () => { writeContract.reset() } : () => { writeContract.write?.() } }
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
            </div>        
        </Page>             
    );
}

export default PageFactory;
import { Fragment, useState } from "react";
import { Modal } from "../components/common/modal";
import { Page } from "../components/common/page";
import { Button } from "../components/common/button";
import { FactoryModal } from "../components/factory/factoryModal";
import { PropsVaultView, VaultView } from "../components/vault/vaultView";


const vault: PropsVaultView = {
    name: "Vault Name",
    assetName: "Vault Asset Name",
    assetPoolAddress: "0x123456",
    strategyName: "Stratety name",
    strategyPoolAddress: "0x123456",
    priceFeed: "Price feed",
    totalHoldings: "1000",
    apy: "2.5%"
}


export const PageConnected = () => {
    const [ openModal, setOpenModal ] = useState<boolean>(false);
    return (
        <Fragment>
            
            <Page>
                <div className="w-full flex flex-col justify-start items-start gap-4">
                    <div className="w-full flex flex-row justify-between items-center">
                        <div className="text-2xl text-slate-100">
                            Pools
                        </div>
                        <Button
                            onClick={ () => setOpenModal(true) }
                        >
                            Create Pool
                        </Button>
                    </div>  

                    <div className="w-full flex flex-col justify-start items-start gap-8">
                        <VaultView { ...vault} />
                        <VaultView { ...vault} />
                        <VaultView { ...vault} />
                    </div>

                </div>
            </Page>

            <Modal isOpen={ openModal } closeModal={ () => setOpenModal(false) }>                    
                <FactoryModal
                    closeModal={() => setOpenModal(false) }
                />
            </Modal>

        </Fragment>
    );
}

export default PageConnected;
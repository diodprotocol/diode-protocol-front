import { useRouter } from 'next/router'
import { Tab } from "@headlessui/react";
import { VaultDeposit } from './vaultDeposit';
import { TabPanel } from "../../components/common/tabPanel";
import { TransactionTabTitle } from '../transaction/transactionTabTitle';
import { VaultWithdraw } from './vaultWithdraw';


export const VaultAction = (props: { contractAddress: string }) => {

    const router = useRouter();
    const { contractAddress } = router.query;

    let vaultDeposit;
    if (router.isReady) {
        if (typeof contractAddress === "string") {
            vaultDeposit = <VaultDeposit contractAddress={ contractAddress } />;
        }
    }

    let vaultWithdraw;
    if (router.isReady) {
        if (typeof contractAddress === "string") {
            vaultWithdraw = <VaultWithdraw contractAddress={ contractAddress } />;
        }
    }

    return (
        <div className="
            w-full 
            h-full
            "
        >

            <Tab.Group>

                <div className="w-full flex justify-between items-center">
                    <Tab.List className="w-full pt-4 pb-2 flex flex-row justify-between items-center">                    
                        <TransactionTabTitle> Deposit </TransactionTabTitle>
                        <TransactionTabTitle> Withdraw </TransactionTabTitle>                                    
                    </Tab.List>                        
                </div>

                <Tab.Panels className="w-full h-full flex">

                    <TabPanel>
                        { vaultDeposit }
                    </TabPanel>
                    <TabPanel>
                        { vaultWithdraw }
                    </TabPanel>
                    
                </Tab.Panels>

            </Tab.Group>
        
        </div>
    );
}
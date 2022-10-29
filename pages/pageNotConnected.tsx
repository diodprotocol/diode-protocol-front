import { Page } from "../components/common/page";


export const PageNotConnected = () => {
    return (
        <Page>
            <div className="w-full mt-16 flex flex-col justify-start items-start gap-12">
                
                <div className="text-transparent text-4xl bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
                    Connect wallet
                </div>

                <div className="text-3xl text-zinc-100 font-mono">
                    to access the
                </div>

                <div className="flex flex-row text-4xl text-zinc-100 gap-6">
                    Diode Protocol
                </div>

            </div>
        </Page>
    );
}

export default PageNotConnected;
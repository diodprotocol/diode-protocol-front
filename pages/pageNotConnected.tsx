import { Page } from "../components/common/page";


export const PageNotConnected = () => {
    return (
        <Page>
            <div className="w-full mt-16 flex flex-col justify-start items-start gap-12">
                
                <div className="text-transparent text-6xl bg-clip-text bg-gradient-to-r from-violet-600 to-violet-400 font-light font-sans">
                    Connect wallet
                </div>

                <div className="text-3xl text-zinc-100 font-light font-sans">
                    to access the
                </div>

                <div className="flex flex-row text-6xl text-zinc-100 gap-6 font-light font-sans">
                    Diode Protocol
                </div>

            </div>
        </Page>
    );
}

export default PageNotConnected;
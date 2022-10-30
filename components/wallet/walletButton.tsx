
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../common/button";


export const WalletButton = () => {
    return (
      <ConnectButton.Custom>
        {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');
  
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button onClick={ openConnectModal }>
                      Connect Wallet
                    </Button>
                  );
                }
  
                if (chain.unsupported) {
                  return (
                    <Button onClick={ openChainModal }>
                      Wrong network
                    </Button>
                  );
                }
  
                return (
                  <div className="flex flex-row items-center justify-start gap-4">
                    
                    <Button onClick={ openChainModal }>
                      { chain.hasIcon && (
                        <div>
                            {chain.iconUrl && (
                              <Image
                              alt={ chain.name ?? 'Chain icon' }
                              src={ chain.iconUrl }
                              width={ 16 }
                              height={ 16 }                                  
                              />
                              )}
                        </div>
                      )}
                      <div className="hidden md:flex font-sans font-light text-sm">
                        { chain.name }
                      </div>
                    </Button>
                    
                    <Button onClick={ openAccountModal }>
                      <div className="flex flex-row items-center justify-start gap-4">
                        <div className="hidden md:flex font-sans font-light text-xs">
                          { account.displayBalance ? `${ account.displayBalance }` : ''}
                        </div>
                        <div className="bg-zinc-700 rounded-lg px-2 font-sans font-light text-sm">
                          { account.displayName }
                        </div>
                      </div>
                    </Button>    

                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
};

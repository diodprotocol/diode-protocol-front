// import { PublicIconForGithub } from "../../icons/publicIcon";

import { PublicIconForGithub } from "../icons/publicIcon";
import { PublicIconForTwitter } from "../icons/publicIcon";


export const Footer = () =>  {
    return (
        <div className="flex flex-row items-center justify-between">
            
            <div className="text-sm text-slate-200">
                Copyright © 2022 Diode Protocol
            </div>

            <div className="flex flex-row items-center justify-between gap-12">                    
                <a 
                    className="font-sans font-light text-xs zinc-400"
                    href="https://github.com/diodprotocol/diode-protocol-front/blob/main/public/whitepaper.pdf" 
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Technical paper                
                </a>
                <div className="flex flex-row items-center justify-between gap-8">                    
                    <PublicIconForGithub />                
                </div>
            </div>


        </div>
    );
}

import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { HorizontalLine } from "./horizontalLine";


interface PageProps {
    children: React.ReactNode; 
}

export const Page = (props: PageProps) =>  {    
    return (
        <div className="min-h-screen flex flex-col">

            <header className="min-w-full py-8 px-8 bg-zinc-900">
                <div className="mx-auto max-w-screen-sm md:max-w-screen-md">
                    <div className="pb-8">
                        <Header/>
                    </div>                    
                </div>
            </header>

            <main className="min-w-full flex-grow px-8 bg-zinc-900">
                <div className="mx-auto max-w-screen-sm md:max-w-screen-md">
                    { props.children }
                </div>
            </main>

            <footer className="min-w-full py-8 px-8 bg-zinc-900">
                <div className="mx-auto max-w-screen-sm md:max-w-screen-md">
                    <div className="pt-8">
                        <Footer/>
                    </div>
                </div>
            </footer>

        </div>
    );
}

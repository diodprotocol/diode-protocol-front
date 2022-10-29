import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Footer } from "./footer";
import { Header } from "./header";
import { HorizontalLine } from "./horizontalLine";
import { DiodIcon } from "../icons/diodIcon";


interface PageProps {
    children: React.ReactNode; 
}

export const Page = (props: PageProps) =>  {    
    return (
        <div className="min-h-screen flex flex-col">

            <header className="min-w-full pt-8 px-8 bg-gradient-to-b from-zinc-800 to-zinc-800">
                <div className="mx-auto max-w-screen-sm lg:max-w-screen-lg">
                    <div className="pb-8">
                        <Header/>
                    </div>                    
                </div>                
            </header>

            <main className="min-w-full flex-grow pt-8 pb-8 px-8 bg-zinc-900">
                <div className="mx-auto max-w-screen-sm lg:max-w-screen-lg">
                    { props.children }
                </div>
            </main>

            <footer className="min-w-full pb-8 bg-gradient-to-t from-zinc-900 to-zinc-900">
                <HorizontalLine/>
                <div className="mx-auto max-w-screen-sm lg:max-w-screen-lg">
                    <div className="pt-8">
                        <Footer/>
                    </div>
                </div>
            </footer>

        </div>
    );
}

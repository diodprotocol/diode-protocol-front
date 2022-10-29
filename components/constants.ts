import { Asset } from './interface/asset';


export const supportedAssets: Array<Asset> = [
    {
        name: "stEth",
        address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
    }
]


export const supportedPriceFeed: Array<Asset> = [
    {
        name: "ETH/USD",
        address: "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419",
    },
    {
        name: "BTC/USD",
        address: "0xf4030086522a5beea4988f8ca5b36dbc97bee88c",
    },
]


export const supportedStrategy: Array<Asset> = [
    {
        name: "Euler",
        address: "0x9f4ec3df9cbd43714fe2740f5e3616155c5b8459",
    },
    {
        name: "Sommelier",
        address: "0xf2030086522a5beea4988f8ca5b36dbc974ee88c",
    },
]


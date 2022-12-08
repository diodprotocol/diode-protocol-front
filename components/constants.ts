import { Asset } from "./interface/asset";


export const supportedAssets: Array<Asset> = [
    {
        name: "WETH",
        address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    },
    {
        name: "WMATIC",
        address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    },
    {
        name: "stMATIC",
        address: "0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4",
    },
    //address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    // address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
    // {
    //     // name: "stEth",
    //     // address: "0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F"
    //     // address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
    // }
]


export const supportedPriceFeed: Array<Asset> = [
    {
        name: "ETH/USD",
        address: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
        //address: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
        // address: "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419",
    },
    {
        name: "BTC/USD",
        address: "0xc907E116054Ad103354f2D350FD2514433D57F6f",
    },
    {
        name: "BTC/ETH",
        address: "0x19b0F0833C78c0848109E3842D34d2fDF2cA69BA",
    }
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

export const supportedCurvePools: Array<Asset> = [
    {
        name: "ETH/USD",
        address: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    },
]

export const supportedBeefyVaults: Array<Asset> = [
    {
        name: "Moo Curve stMATIC-MATIC",
        address: "0xE0570ddFca69E5E90d83Ea04bb33824D3BbE6a85"
    }
]

export const supportedCurvePool: Array<Asset> = [
    {
        name: "curvePool",
        address: "0xFb6FE7802bA9290ef8b00CA16Af4Bc26eb663a28",
    }
]

export const supportedCurveLp: Array<Asset> = [
    {
        name: "curveLPToken",
        address: "0xe7CEA2F6d7b120174BF3A9Bc98efaF1fF72C997d",
    }
]

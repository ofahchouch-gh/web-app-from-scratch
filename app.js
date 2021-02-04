import { fetchAllHighestBidPricesOfMostPopularCrypto } from './src/app/cryptocurrencies/cryptocurrencies.js';

async function app() {
    const listOfMostPopularCryptoTickerNames = [
        'BTCUSDT',
        'ETHUSDT',
        'XRPUSDT',
        'XLMUSDT',
        'ADAUSDT',
        'DOTUSDT',
        'NEOUSDT',
        'LINKUSDT',
        'XMRUSDT',
        'BNBUSDT'
    ];

    const listOfMostPopularCryptoBidPrices = await fetchAllHighestBidPricesOfMostPopularCrypto(listOfMostPopularCryptoTickerNames);
    console.log(listOfMostPopularCryptoBidPrices);
}

app();
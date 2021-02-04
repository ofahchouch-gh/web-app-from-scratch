import { fetchSpecificTicker, getHighestBidPriceOfFetchedTicker } from '../binance/binanceApiHandler.js';

export async function fetchAllHighestBidPricesOfMostPopularCrypto(listOfMostPopularCryptoTickerNames) {
    let listOfMostPopularCryptoBidPrices = [];
    
    for(const popularCryptoTickerName of listOfMostPopularCryptoTickerNames) {
        const fetchedTicker = await fetchSpecificTicker(popularCryptoTickerName);
        const highestBidPriceOfFetchedTicker = getHighestBidPriceOfFetchedTicker(fetchedTicker);

        listOfMostPopularCryptoBidPrices.push({ popularCryptoTickerName: popularCryptoTickerName,
            highestBidPriceOfFetchedTicker: highestBidPriceOfFetchedTicker
        });
    }

    return listOfMostPopularCryptoBidPrices;
}
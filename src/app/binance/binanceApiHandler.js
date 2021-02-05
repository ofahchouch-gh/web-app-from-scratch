const BINANCE_API_URL_PREFIX = 'https://api.binance.com/api/v1';

export async function fetchAllTickers() {
    try {
        const url = `${BINANCE_API_URL_PREFIX}/exchangeInfo`;

        const fetchAllTickerApiResponse = await fetch(`${url}`, { method: 'GET' });
        const fetchedTickers = await fetchAllTickerApiResponse.json();

        return fetchedTickers;
    } catch(error) {
        console.log('failed to fetch tickers: ', error);
    }
}

export async function fetchBidAndAskPriceOfSpecificTicker(tickerName) {
    try {
        const url = `${BINANCE_API_URL_PREFIX}/depth?symbol=${tickerName}&limit=5`;

        const fetchSpecificTickerApiResponse = await fetch(`${url}`, { method: 'GET' });
        const fetchedTicker = await fetchSpecificTickerApiResponse.json();

        return fetchedTicker;
    } catch(error) {
        console.log('failed to fetch ticker: ', error);
    }
}

export function getHighestBidPriceOfFetchedTicker(ticker) {
    let highestBidPriceOfFetchedTicker = ticker.bids[0];

    ticker.bids.find(fetchedBidPriceOfTicker => {
        const bidPriceOfFetchedTicker = fetchedBidPriceOfTicker[0];

        if(bidPriceOfFetchedTicker > highestBidPriceOfFetchedTicker) {
            highestBidPriceOfFetchedTicker = bidPriceOfFetchedTicker;
        }
    });

    return highestBidPriceOfFetchedTicker;
}

export function getLowestAskPriceOfFetchedTicker(ticker) {
    let lowestAskPriceOfFetchedTicker = ticker.asks[0];

    ticker.asks.find(fetchedAskPriceOfTicker => {
        const askPriceOfFetchedTicker = fetchedAskPriceOfTicker[0];

        if(askPriceOfFetchedTicker < lowestAskPriceOfFetchedTicker) {
            lowestAskPriceOfFetchedTicker = askPriceOfFetchedTicker;
        }
    });

    return lowestAskPriceOfFetchedTicker;
}

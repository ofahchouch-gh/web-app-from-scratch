const BINANCE_API_URL_PREFIX = 'https://api.binance.com/api/v1';

export async function fetchAllTickers() {
    try {
        const url = `${BINANCE_API_URL_PREFIX}/exchangeInfo`;

        const fetchAllTickersApiResponse = await fetch(`${url}`, { method: 'GET' });
        const fetchedTickers = await fetchAllTickersApiResponse.json();

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

export function getLowestBidPriceOfFetchedTicker(ticker) {
    let lowestBidPriceOfFetchedTicker = ticker.bids[0];

    ticker.bids.find(fetchedBidPriceOfTicker => {
        const bidPriceOfFetchedTicker = fetchedBidPriceOfTicker[0];

        if(bidPriceOfFetchedTicker < lowestBidPriceOfFetchedTicker) {
            lowestBidPriceOfFetchedTicker = bidPriceOfFetchedTicker;
        }
    });

    return lowestBidPriceOfFetchedTicker;
}

export function getHighestAskPriceOfFetchedTicker(ticker) {
    let highestAskPriceOfFetchedTicker = ticker.asks[0];

    ticker.asks.find(fetchedAskPriceOfTicker => {
        const askPriceOfFetchedTicker = fetchedAskPriceOfTicker[0];

        if(askPriceOfFetchedTicker > highestAskPriceOfFetchedTicker) {
            highestAskPriceOfFetchedTicker = askPriceOfFetchedTicker;
        }
    });

    return highestAskPriceOfFetchedTicker;
}

const BINANCE_API_URL_PREFIX = 'https://api.binance.com/api/v1';

export async function fetchAllTickers() {
    let url = `${BINANCE_API_URL_PREFIX}/exchangeInfo`;
    let fetchedTickers = [];

    await fetch(`${url}`, {
        method: 'GET'
    }).then(fetchedData => {
        return fetchedData.json();
    }).then(fetchedData => {
        fetchedTickers = fetchedData;
    }).catch(error => {
        // later afhandelen met een exception message
        console.log('failed to fetch data: ', error);
    });
    
    return fetchedTickers;
}

export async function fetchBidAndAskPriceOfSpecificTicker(tickerName) {
    let url = `${BINANCE_API_URL_PREFIX}/depth?symbol=${tickerName}&limit=5`;
    let fetchedTicker = null;

    await fetch(`${url}`, {
        method: 'GET'
    }).then(fetchedData => {
        return fetchedData.json();
    }).then(fetchedData => {
        fetchedTicker = fetchedData;
    }).catch(error => {
        // later afhandelen met een exception message
        console.log('failed to fetch data: ', error);
    });
    
    return fetchedTicker;
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

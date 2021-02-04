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
        console.log('failed to fetch data: ', error);
    });
    
    return fetchedTickers;
}

export async function fetchSpecificTicker(tickerName) {
    let url = `${BINANCE_API_URL_PREFIX}/depth?symbol=${tickerName}&limit=5`;
    let fetchedTicker = null;

    await fetch(`${url}`, {
        method: 'GET'
    }).then(fetchedData => {
        return fetchedData.json();
    }).then(fetchedData => {
        fetchedTicker = fetchedData;
    }).catch(error => {
        console.log('failed to fetch data: ', error);
    });
    
    return fetchedTicker;
}

export function getHighestBidPriceOfFetchedTicker(ticker) {
    let highestBidPriceOfFetchedTicker = 0;

    ticker.bids.find(fetchedBidPriceOfTicker => {
        const bidPriceOfFetchedTicker = fetchedBidPriceOfTicker[0];

        if(bidPriceOfFetchedTicker > highestBidPriceOfFetchedTicker) {
            highestBidPriceOfFetchedTicker = bidPriceOfFetchedTicker;
        }
    });

    return highestBidPriceOfFetchedTicker;
}

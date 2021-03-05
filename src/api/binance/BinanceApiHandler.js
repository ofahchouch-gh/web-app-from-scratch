export default class binanceApiHandler {
    BINANCE_API_URL_PREFIX;

    constructor() {
        this.BINANCE_API_URL_PREFIX = 'https://api.binance.com/api/v1';
    }

    async fetchAllTickers() {
        try {
            const url = `${this.BINANCE_API_URL_PREFIX}/exchangeInfo`;
    
            const fetchedTickersApiResponse = await fetch(`${url}`, { method: 'GET' });
            const fetchedTickers = await fetchedTickersApiResponse.json();
            
            return fetchedTickers;
        } catch(error) {
            console.log('failed to fetch tickers: ', error);
        }
    }

    async fetchBidAndAskPriceOfTicker(nameOfTickerToBeFetched) {
        try {
            const url = `${this.BINANCE_API_URL_PREFIX}/depth?symbol=${nameOfTickerToBeFetched}&limit=5`;
    
            const fetchedSpecificTickerApiResponse = await fetch(`${url}`, { method: 'GET' });
            const fetchedTicker = await fetchedSpecificTickerApiResponse.json();
    
            return fetchedTicker;
        } catch(error) {
            console.log('failed to fetch ticker: ', error);
        }
    }

    async fetchAllDetailsOfTicker(nameOfTickerToBeFetched) {
        try {
            const url = `${this.BINANCE_API_URL_PREFIX}`;
    
            const fetchedTickerWithAllDetailsApiResponse = await fetch(`${url}`, { method: 'GET' });
            const fetchedTicker = await fetchedTickerWithAllDetailsApiResponse.json();
    
            return fetchedTicker;
        } catch(error) {
            console.log('failed to fetch all details of ticker: ', error);
        }
    }

    async fetchCandleStickDataOfTicker(nameOfTickerToBeFetched, interval, startTime, endTime, limit) {
        try {
            const url = `${this.BINANCE_API_URL_PREFIX}/klines?symbol=${nameOfTickerToBeFetched}&` +
            `interval=${interval}&` +
            `startTime=${startTime}&` +
            `endTime=${endTime}&` +
            `limit=${limit}`;

            const fetchedCandleStickDataOfTickerApiResponse = await fetch(`${url}`, { method: 'GET' });
            const fetchedCandleStickDataOfticker = await fetchedCandleStickDataOfTickerApiResponse.json();
    
            return fetchedCandleStickDataOfticker;
        } catch(error) {
            console.log('failed to fetch candle stick data of ticker: ', error);
        }
    }

    async fetchRecentTradesList(nameOfTickerToBeFetched) {
        try {
            const url = `${this.BINANCE_API_URL_PREFIX}/trades?symbol=${nameOfTickerToBeFetched}&limit=20`;

            const fetchedRecentTradesListApiResponse = await fetch(`${url}`, { method: 'GET' });
            const fetchedRecentTradesList = await fetchedRecentTradesListApiResponse.json();
            
            return fetchedRecentTradesList;
        } catch(error) {
            console.log('failed to fetch recent trades of ticker: ', error);
        }
    }
}
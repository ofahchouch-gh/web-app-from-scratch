export default class binanceApiHandler {
    BINANCE_API_URL_PREFIX;

    constructor() {
        this.BINANCE_API_URL_PREFIX = 'https://api.binance.com/api/v1';
    }

    async fetchAllTickers() {
        try {
            const url = `${this.BINANCE_API_URL_PREFIX}/exchangeInfo`;
    
            const fetchAllTickersApiResponse = await fetch(`${url}`, { method: 'GET' });
            const fetchedTickers = await fetchAllTickersApiResponse.json();
            
            return fetchedTickers;
        } catch(error) {
            console.log('failed to fetch tickers: ', error);
        }
    }

    async fetchBidAndAskPriceOfTicker(nameOfTicker) {
        try {
            const url = `${this.BINANCE_API_URL_PREFIX}/depth?symbol=${nameOfTicker}&limit=5`;
    
            const fetchSpecificTickerApiResponse = await fetch(`${url}`, { method: 'GET' });
            const fetchedTicker = await fetchSpecificTickerApiResponse.json();
    
            return fetchedTicker;
        } catch(error) {
            console.log('failed to fetch ticker: ', error);
        }
    }

    async fetchAllDetailsOfTicker(nameOfTicker) {}
}
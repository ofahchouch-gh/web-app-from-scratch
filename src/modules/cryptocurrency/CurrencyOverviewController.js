import BinanceApiHandler from '../../api/binance/BinanceApiHandler.js';
import CurrencyOverview from './CurrencyOverview.js';
import Sleeper from '../shared/services/Sleeper.js';


export default class CurrencyOverviewController {
    currencyOverviewModel;
    binanceApiHandler;
    listOfMostPopularCryptoTickerNames;
    sleeper;
    
    constructor() {
        this.listOfMostPopularCryptoTickerNames = [ 'BTCUSDT', 
            'ETHUSDT', 'XRPUSDT', 'DASHUSDT',
            'XLMUSDT', 'LTCUSDT', 'DOGEUSDT',
            'ADAUSDT', 'DOTUSDT', 'NEOUSDT',
            'LINKUSDT', 'XMRUSDT', 'BNBUSDT',
            'EOSUSDT', 'VETUSDT', 'BCHUSDT',
            'ZECUSDT', 'VETUSDT', 'TRXUSDT',
            'XEMUSDT'
        ];

        this.binanceApiHandler = new BinanceApiHandler();
        this.sleeper = new Sleeper();
    }

    addRoutingEventListenersToTableData() {
        this.listOfMostPopularCryptoTickerNames.map((popularCryptoTickerName, index) => {
            document.getElementsByTagName("td")[index].addEventListener('click', function (mouseEvent) {
                const currencyOverview = new CurrencyOverview();
                currencyOverview.routeToCoinDetailView(popularCryptoTickerName);
            });  
        });
    }

    async fetchAllHighestBidAndLowestAskPricesWithProfitOrLossOfMostPopularCrypto() {
        let listOfMostPopularCryptoBidPrices = [];

        const listOfMostPopularCryptoTickerNamesPromises = this.listOfMostPopularCryptoTickerNames.map(async popularCryptoTickerName => {
            const fetchedBidAndAskPriceOfSpecificTicker = await this.binanceApiHandler.fetchBidAndAskPriceOfTicker(popularCryptoTickerName);
            const lowestBidPriceOfFetchedTicker = Number.parseFloat(this.getLowestBidPriceOfFetchedTicker(fetchedBidAndAskPriceOfSpecificTicker)).toFixed(2);
            const highestAskPriceOfFetchedTicker = Number.parseFloat(this.getHighestAskPriceOfFetchedTicker(fetchedBidAndAskPriceOfSpecificTicker)).toFixed(2);
            const potentialProfitOrLossThatCouldBeMade = Number.parseFloat((highestAskPriceOfFetchedTicker - lowestBidPriceOfFetchedTicker)).toFixed(2);
            
            const popularCryptoCurrency = { 
                'Popular crypto ticker name ($/USDT)': popularCryptoTickerName,
                'Current avg. lowest bid price': lowestBidPriceOfFetchedTicker,
                'Current avg. highest ask price': highestAskPriceOfFetchedTicker,
                'Current avg. profit/loss with 1 coin': potentialProfitOrLossThatCouldBeMade
            };

            return popularCryptoCurrency;
        });

        await this.sleeper.sleep(2000);
        listOfMostPopularCryptoBidPrices = await Promise.all(listOfMostPopularCryptoTickerNamesPromises);
    
        return listOfMostPopularCryptoBidPrices;
    }

    getLowestBidPriceOfFetchedTicker(ticker) {
        let lowestBidPriceOfFetchedTicker = ticker.bids[0];
    
        ticker.bids.find(fetchedBidPriceOfTicker => {
            const bidPriceOfFetchedTicker = fetchedBidPriceOfTicker[0];

            if(bidPriceOfFetchedTicker < lowestBidPriceOfFetchedTicker) {
                lowestBidPriceOfFetchedTicker = bidPriceOfFetchedTicker;
            }
        });
    
        return lowestBidPriceOfFetchedTicker;
    }

    getHighestAskPriceOfFetchedTicker(ticker) {
        let highestAskPriceOfFetchedTicker = ticker.asks[0];
    
        ticker.asks.find(fetchedAskPriceOfTicker => {
            const askPriceOfFetchedTicker = fetchedAskPriceOfTicker[0];
    
            if(askPriceOfFetchedTicker > highestAskPriceOfFetchedTicker) {
                highestAskPriceOfFetchedTicker = askPriceOfFetchedTicker;
            }
        });
    
        return highestAskPriceOfFetchedTicker;
    }
}

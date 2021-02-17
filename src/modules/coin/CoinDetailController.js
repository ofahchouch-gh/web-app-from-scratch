import BinanceApiHandler from '../binance/BinanceApiHandler.js';
import CoinDetailModel from './CoinDetailModel.js';
import CandlestickModel from '../shared/models/candlestick/CandlestickModel.js';

export default class CoinDetailController {
    coinDetailModel;
    binanceApiHandler;

    constructor() {
        this.binanceApiHandler = new BinanceApiHandler();
        this.coinDetailModel = new CoinDetailModel();
    }

    putDetailView() {}

    putCoinSection() {}

    async fetchAllDetailsOfTicker(nameOfTickerToBeFetched) {
        const fetchedTickerWithAllDetails = await this.binanceApiHandler.fetchAllDetailsOfTicker(nameOfTickerToBeFetched);

        console.log(fetchedTickerWithAllDetails);
    }

    async fetchRecentTradesList(nameOfTickerToBeFetched) {
        while(true) { 
            const recentTrades = await this.binanceApiHandler.fetchRecentTradesList(nameOfTickerToBeFetched);
            this.coinDetailModel.putRecentTrades(recentTrades);

            console.log(this.coinDetailModel.recentTrades);

            await this.sleep(500);
        }
    }

    async fetchCandleStickDataOfTicker(nameOfTickerToBeFetched) {
        let candleSticks = [];

        nameOfTickerToBeFetched = nameOfTickerToBeFetched.replace(/\s/g, '');
        const currentDate = new Date();
        const amountOfDaysToLookBackInto = 1;
        const oneHourInEpochFormat = (1000*60*60);

        const intervalOfCandleStickData = '1m';
        const startTimeOfCandleSticksInMs = (currentDate.getTime() - (oneHourInEpochFormat / 10));
        const endTimeOfCandleSticksInMs = currentDate.getTime();
        const limit = 1000;

        const dateFormatOptions = { timeZone: 'UTC', timeZoneName: 'short' };

        const fetchedCandleStickDataOfTicker = await this.binanceApiHandler.fetchCandleStickDataOfTicker(
            nameOfTickerToBeFetched,
            intervalOfCandleStickData,
            startTimeOfCandleSticksInMs,
            endTimeOfCandleSticksInMs,
            limit
        );
        
        this.fetchRecentTradesList(nameOfTickerToBeFetched);

        for (const candleStick of fetchedCandleStickDataOfTicker) {
            const openTime = new Date(candleStick[0]).toLocaleTimeString('en-US', dateFormatOptions);
            const closeTime = new Date(candleStick[6]).toLocaleTimeString('en-US', dateFormatOptions);

            const candlestickModel = new CandlestickModel(nameOfTickerToBeFetched, 
                openTime,
                candleStick[1], 
                candleStick[4], 
                closeTime
            );
            
            candleSticks.push(candlestickModel);
        }  
        
        return candleSticks;
    }
    
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}
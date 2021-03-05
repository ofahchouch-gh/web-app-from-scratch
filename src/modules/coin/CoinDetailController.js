import BinanceApiHandler from '../../api/binance/BinanceApiHandler.js';
import CoinDetailModel from './CoinDetailModel.js';
import CandlestickModel from '../shared/models/candlestick/CandlestickModel.js';
import Sleeper from '../shared/services/Sleeper.js';

export default class CoinDetailController {
    coinDetailModel;
    binanceApiHandler;
    sleeper;

    constructor() {
        this.binanceApiHandler = new BinanceApiHandler();
        this.coinDetailModel = new CoinDetailModel();
        this.sleeper = new Sleeper();
    }

    async fetchAllDetailsOfTicker(nameOfTickerToBeFetched) {
        const fetchedTickerWithAllDetails = await this.binanceApiHandler.fetchAllDetailsOfTicker(nameOfTickerToBeFetched);
    }

    async fetchRecentTradesList(nameOfTickerToBeFetched) {
        while(true) { 
            const recentTrades = await this.binanceApiHandler.fetchRecentTradesList(nameOfTickerToBeFetched);
            this.coinDetailModel.putRecentTrades(recentTrades);
            
            await this.sleeper.sleep(500);
        }
    }

    async fetchCandleStickDataOfTicker(nameOfTickerToBeFetched) {
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
        
        const candleSticks = fetchedCandleStickDataOfTicker.map(candleStick => {
            const openTime = new Date(candleStick[0]).toLocaleTimeString('en-US', dateFormatOptions);
            const closeTime = new Date(candleStick[6]).toLocaleTimeString('en-US', dateFormatOptions);

            const candlestickModel = new CandlestickModel(nameOfTickerToBeFetched, 
                openTime,
                candleStick[1], 
                candleStick[4], 
                closeTime
            );

            return candlestickModel;
        });
        
        return candleSticks;
    }
}
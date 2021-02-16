import BinanceApiHandler from '../binance/BinanceApiHandler.js';
import CoinDetailModel from './CoinDetailModel.js';
import CandlestickModel from '../shared/models/candlestick/CandlestickModel.js';

export default class CoinDetailController {
    coinDetailModel;
    binanceApiHandler;

    constructor() {
        this.binanceApiHandler = new BinanceApiHandler();
    }

    putDetailView() {}

    putCoinSection() {}

    async fetchAllDetailsOfTicker(nameOfTickerToBeFetched) {
        const fetchedTickerWithAllDetails = await this.binanceApiHandler.fetchAllDetailsOfTicker(nameOfTickerToBeFetched);

        console.log(fetchedTickerWithAllDetails);
    }

    async fetchCandleStickDataOfTicker(nameOfTickerToBeFetched) {
        let candleSticks = [];

        nameOfTickerToBeFetched = nameOfTickerToBeFetched.replace(/\s/g, '');
        const currentDate = new Date();
        const dateOfYesterday = new Date();
        const amountOfDaysToLookBackInto = 7;
        dateOfYesterday.setDate(currentDate.getDate() - amountOfDaysToLookBackInto);

        const intervalOfCandleStickData = '1d';
        const startTimeOfCandleSticksInMs = dateOfYesterday.getTime();
        const endTimeOfCandleSticksInMs = currentDate.getTime();
        const limit = 1000;

        const dateFormatOptions = { month: 'numeric', day: 'numeric' };

        const fetchedCandleStickDataOfTicker = await this.binanceApiHandler.fetchCandleStickDataOfTicker(
            nameOfTickerToBeFetched,
            intervalOfCandleStickData,
            startTimeOfCandleSticksInMs,
            endTimeOfCandleSticksInMs,
            limit
        );
        
        for (const candleStick of fetchedCandleStickDataOfTicker) {
            const openTime = new Date(candleStick[0]).toLocaleDateString('en-US', dateFormatOptions);
            const closeTime = new Date(candleStick[6]).toLocaleDateString('en-US', dateFormatOptions);

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
}
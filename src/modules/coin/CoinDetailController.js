import BinanceApiHandler from '../binance/BinanceApiHandler.js';
import CoinDetailModel from './CoinDetailModel.js';
import CandlestickModel from './../candlestick/CandlestickModel.js';

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
        // test
        nameOfTickerToBeFetched = nameOfTickerToBeFetched.replace(/\s/g, '');
        const currentDate = new Date();
        const dateOfYesterday = new Date();
        dateOfYesterday.setDate(currentDate.getDate() - 1);

        const intervalOfCandleStickData = '1h';
        const startTimeOfCandleSticksInMs = dateOfYesterday.getTime();
        const endTimeOfCandleSticksInMs = currentDate.getTime();
        const limit = 1000;

        const fetchedCandleStickDataOfTicker = await this.binanceApiHandler.fetchCandleStickDataOfTicker(
            nameOfTickerToBeFetched,
            intervalOfCandleStickData,
            startTimeOfCandleSticksInMs,
            endTimeOfCandleSticksInMs,
            limit
        );
        
        this.createBullishOrBearishCandleSticks(nameOfTickerToBeFetched, fetchedCandleStickDataOfTicker);
    }

    createBullishOrBearishCandleSticks(nameOfTicker, fetchedCandleStickDataOfTicker) {
        let candlesticks = [];

        for (const candleStick of fetchedCandleStickDataOfTicker) {
            const candlestickModel = new CandlestickModel(nameOfTicker, 
                candleStick[0], 
                candleStick[1], 
                candleStick[4], 
                candleStick[6]
            );

            const candleStickOpenTimeInLocalDate = new Date(candlestickModel.openTimeInMs).toLocaleString();
            const candleStickCloseTimeInLocalDate = new Date(candlestickModel.closeTimeInMs).toLocaleString();
            const candleStickOpenToCloseLocalDateTextMessage = `From ${candleStickOpenTimeInLocalDate} to ${candleStickCloseTimeInLocalDate}`;
            
            // if(candlestickModel.bullish) {
            //     console.log('%c' + candleStickOpenToCloseLocalDateTextMessage, 'color:' + 'Green');
            // } else {
            //     console.log('%c' + candleStickOpenToCloseLocalDateTextMessage, 'color:' + 'Red');
            // }

            candlesticks.push(candlestickModel);
        }

        this.checkIfCandlestickIsAHigherHighOrHigherLow(candlesticks);
    }

    checkIfCandlestickIsAHigherHighOrHigherLow(candlesticks) {
        let previousCandlestick = candlesticks[0];
        let currentHigherHigh = candlesticks[0];
        let currentHigherLow = null;

        let smallestCandleStickWaves = [];
        let current3CandleStickWave = [];

        for(const candlestick of candlesticks) {
            //test
            const candleStickOpenTimeInLocalDate = new Date(candlestick.openTimeInMs).toLocaleString();
            const candleStickCloseTimeInLocalDate = new Date(candlestick.closeTimeInMs).toLocaleString();
            const candleStickOpenToCloseLocalDateTextMessage = `From ${candleStickOpenTimeInLocalDate} to ${candleStickCloseTimeInLocalDate}`;

            if(candlestick.bullish) {
                console.log('%c' + candleStickOpenToCloseLocalDateTextMessage, 'color:' + 'Green');
            } else {
                console.log('%c' + candleStickOpenToCloseLocalDateTextMessage, 'color:' + 'Red');
            }
            //

            if (current3CandleStickWave.length <= 1) {
                current3CandleStickWave.push(candlestick);
            } else {
                current3CandleStickWave.push(candlestick);

                if () {

                }

                smallestCandleStickWaves.push(current3CandleStickWave);
                current3CandleStickWave = [];
            }
            
            // if (candlestick.closePrice > previousCandlestick.closePrice) {
            //     console.log('higher then previous');
            // } else if (candlestick.closePrice < previousCandlestick.closePrice) {
            //     console.log('lower then previous');
            // } else {
            //     console.log('starting point');
            // }

            previousCandlestick = candlestick;
        }

        console.log(smallestCandleStickWaves);
    }
}
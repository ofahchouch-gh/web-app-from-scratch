import BinanceApiHandler from '../binance/BinanceApiHandler.js';
import CoinDetailModel from './CoinDetailModel.js';
import CandlestickModel from '../shared/models/candlestick/CandlestickModel.js';
import Smallest3CandlestickWaveModel from '../shared/models/wave/Smallest3CandlestickWaveModel.js';

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
        
        this.createLineChart();
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
            
            if(candlestickModel.bullish) {
                console.log('%c' + candleStickOpenToCloseLocalDateTextMessage, 'color:' + 'Green');
            } else {
                console.log('%c' + candleStickOpenToCloseLocalDateTextMessage, 'color:' + 'Red');
            }

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
            if (current3CandleStickWave.length <= 1) {
                current3CandleStickWave.push(candlestick);
            } else {
                current3CandleStickWave.push(candlestick);

                const smallest3CandlestickWaveModel = new Smallest3CandlestickWaveModel(
                    current3CandleStickWave[0],
                    current3CandleStickWave[1],
                    current3CandleStickWave[2]
                );

                smallestCandleStickWaves.push(smallest3CandlestickWaveModel);
                current3CandleStickWave = [];
            }

            previousCandlestick = candlestick;
        }

        let previousSmallestCandlestickWave = null;
        let waveCounter = 1;
        for (const smallestCandlestickWave of smallestCandleStickWaves) {
            console.log(`Wave ${waveCounter} of a 3 candlestick long wave is in an uptrend: ${smallestCandlestickWave.checkIfIsInAnUptrend()}`);

            if(previousSmallestCandlestickWave) {
                if (
                    smallestCandlestickWave.lastCandlestick.closePrice > previousSmallestCandlestickWave.middleCandlestick.closePrice &&
                    smallestCandlestickWave.middleCandlestick.closePrice > previousSmallestCandlestickWave.middleCandlestick.closePrice
                ) {
                    //
                }

                previousSmallestCandlestickWave = smallestCandlestickWave;
            } else {
                previousSmallestCandlestickWave = smallestCandlestickWave;
            }

            waveCounter++;
        }
    }

     // moet weg na testen
     getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min)) + min;
    }

    createLineChart() {
        let min = 40000;
        let max = 50000;

        let data = [
          { label: "Jan", value: this.getRandomInt(min, max) },
          { label: "Feb", value: this.getRandomInt(min, max) },
          { label: "March", value: this.getRandomInt(min, max) },
          { label: "April", value: this.getRandomInt(min, max) },
          { label: "May", value: this.getRandomInt(min, max) },
          { label: "June", value: this.getRandomInt(min, max) },
          { label: "July", value: this.getRandomInt(min, max) },
          { label: "Aug", value: this.getRandomInt(min, max) },
          { label: "Sep", value: this.getRandomInt(min, max) },
          { label: "Feb", value: this.getRandomInt(min, max) },
          { label: "March", value: this.getRandomInt(min, max) },
          { label: "April", value: this.getRandomInt(min, max) },
          { label: "May", value: this.getRandomInt(min, max) },
          { label: "June", value: this.getRandomInt(min, max) },
          { label: "July", value: this.getRandomInt(min, max) },
          { label: "Aug", value: this.getRandomInt(min, max) },
          { label: "Sep", value: this.getRandomInt(min, max) },
        ];
      
        let targetId1 = "lineChart";
        let canvas1Width = 320;
        let canvas1Height = 675;
    
        let chart1 = new TChart(targetId1, canvas1Width, canvas1Height, data);
        chart1.drawLineChart({ animation: true });
    }
}
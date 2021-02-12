import BinanceApiHandler from '../binance/BinanceApiHandler.js';
import CoinDetailModel from './CoinDetailModel.js';

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
        const intervalOfCandleStickData = '1h';
        const startTimeOfCandleSticksInMs = 1613023777000;
        const endTimeOfCandleSticksInMs = 1613110177000;
        const limit = 1000;

        const fetchedCandleStickDataOfTicker = await this.binanceApiHandler.fetchCandleStickDataOfTicker(
            nameOfTickerToBeFetched,
            intervalOfCandleStickData,
            startTimeOfCandleSticksInMs,
            endTimeOfCandleSticksInMs,
            limit
        );

        console.log(fetchedCandleStickDataOfTicker);
    }
}
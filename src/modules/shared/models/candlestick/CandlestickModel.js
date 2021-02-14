export default class CandlestickModel {
    tickerName;
    openTimeInMs;
    openPrice;
    closePrice;
    closeTimeInMs;
    bullish;
    typeOfCandlestick;

    constructor(tickerName, openTimeInMs, openPrice, closePrice, closeTimeInMs) {
        this.tickerName = tickerName;
        this.openTimeInMs = openTimeInMs;
        this.openPrice = openPrice;
        this.closePrice = closePrice;
        this.closeTimeInMs = closeTimeInMs;

        this.checkIfCandlestickIsBullishOrBearish();
    }

    checkIfCandlestickIsBullishOrBearish() {
        if(this.closePrice > this.openPrice) {
            this.bullish = true;
        } else {
            this.bullish = false;
        }

        return this.bullish;
    }
}
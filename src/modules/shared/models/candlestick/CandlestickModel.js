export default class CandlestickModel {
    tickerName;
    openTime;
    openPrice;
    closePrice;
    closeTime;
    bullish;
    typeOfCandlestick;

    constructor(tickerName, openTime, openPrice, closePrice, closeTime) {
        this.tickerName = tickerName;
        this.openTime = openTime;
        this.openPrice = openPrice;
        this.closePrice = closePrice;
        this.closeTime = closeTime;
    }
}
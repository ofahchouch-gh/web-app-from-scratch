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
        this.openPrice = Math.round(parseInt(openPrice));
        this.closePrice = Math.round(parseInt(closePrice));
        this.closeTime = closeTime;
    }
}
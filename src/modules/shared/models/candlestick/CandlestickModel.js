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
        this.openPrice = parseInt(openPrice).toFixed();
        this.closePrice = parseInt(closePrice).toFixed();
        this.closeTime = closeTime;
    }
}
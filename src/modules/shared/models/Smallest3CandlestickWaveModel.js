export default class Smallest3CandlestickWaveModel {
    firstCandlestick;
    middleCandlestick;
    lastCandlestick;

    startPosition;
    higherHigh = null;
    higherLow = null;

    inAnUptrend;

    constructor(firstCandlestick, middleCandlestick, lastCandlestick) {
        this.firstCandlestick = firstCandlestick;
        this.middleCandlestick = middleCandlestick;
        this.lastCandlestick = lastCandlestick;

        this.startPosition = firstCandlestick;

        this.checkIfMiddleCandlestickIsAHigherHigh();
        this.checkIfLastCandlestickIsAHigherLow();
        this.checkIfSmallest3CandlestickWaveModelIsInAnUptrend();
    }

    checkIfMiddleCandlestickIsAHigherHigh() {
        if(this.middleCandlestick.closePrice > this.firstCandlestick.closePrice) {
            this.higherHigh = this.middleCandlestick;
        }

        return higherHigh;
    }

    checkIfLastCandlestickIsAHigherLow() {
        if(
            this.lastCandlestick.closePrice < this.middleCandlestick.closePrice &&
            this.lastCandlestick.closePrice > this.startPosition.closePrice
        ) {
            this.higherLow = this.lastCandlestick;
        }

        return higherLow;
    }

    checkIfSmallest3CandlestickWaveModelIsInAnUptrend() {
        if(this.higherHigh && this.higherLow) {
            this.inAnUptrend = true;
        } else {
            this.inAnUptrend = false;
        }

        return this.inAnUptrend;
    }
}
export default class CoinDetailModel {
    coinToBeDisplayed = [];
    coinSection = '';
    recentTrades = [];

    putRecentTrades(recentTradesToBeAdded) {
        this.recentTrades = [];

        recentTradesToBeAdded.forEach(recentTrade => {
            this.recentTrades.push(recentTrade);
        });
    }
}
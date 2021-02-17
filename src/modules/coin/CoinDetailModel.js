export default class CoinDetailModel {
    coinToBeDisplayed = [];
    coinSection = '';
    recentTrades = [];

    putRecentTrades(recentTradesToBeAdded) {
        recentTradesToBeAdded.forEach(recentTrade => {
            this.recentTrades.push(recentTrade);
        });
    }
}
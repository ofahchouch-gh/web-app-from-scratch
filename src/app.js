import CurrencyOverview from './modules/cryptocurrency/CurrencyOverview.js';
import CoinDetailView from './modules/coin/CoinDetailView.js';

(async function app() {
    const currencyOverview = new CurrencyOverview();
    const coinDetailView = new CoinDetailView();

    currencyOverview.renderOverview();
    // coinDetailView.renderDetailView(null);
})();


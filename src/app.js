// import { renderCryptoCurrenciesOverview } from './modules/cryptocurrency/CurrencyOverviewController.js';
import CurrencyOverview from './modules/cryptocurrency/CurrencyOverview.js';

(async function app() {
    // currencyOverview.router.route('overview', null);

    const currencyOverview = new CurrencyOverview();
    currencyOverview.renderOverview();    
})();
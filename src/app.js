// import { renderCryptoCurrenciesOverview } from './modules/cryptocurrency/CurrencyOverviewController.js';
import CurrencyOverview from './modules/cryptocurrency/CurrencyOverview.js';

(async function app() {
    const currencyOverview = new CurrencyOverview();
    currencyOverview.renderOverview(); 
})();


import { route } from './router/router.js';
import { renderCryptoCurrenciesOverview } from './modules/cryptocurrency/CurrencyOverviewController.js';

async function app() {
    route('coin', 'bob');
    while(true) await renderCryptoCurrenciesOverview();
}

app();
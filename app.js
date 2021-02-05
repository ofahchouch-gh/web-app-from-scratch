import { renderCryptoCurrenciesOverview } from './src/app/cryptocurrencyOverview/cryptocurrenyOverviewController.js.js';

async function app() {
    while(true) await renderCryptoCurrenciesOverview();
}

app();
import { renderCryptoCurrenciesOverview } from './src/app/cryptocurrencyOverview/cryptocurrenyOverviewController.js';

async function app() {
    while(true) await renderCryptoCurrenciesOverview();
}

app();
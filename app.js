import { renderCryptoCurrenciesOverview } from './src/app/cryptocurrencyOverview/cryptocurrenyOverviewController.js.js';

async function app() {
    await renderCryptoCurrenciesOverview();
}

app();
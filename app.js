import { renderCryptoCurrenciesOverview } from './src/app/cryptocurrencies/cryptocurrencies.js';

async function app() {
    await renderCryptoCurrenciesOverview();
}

app();
import { renderCryptoCurrenciesOverview } from './src/app/cryptocurrencyOverview/cryptocurrenyOverviewController.js.js';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function app() {
    while(true) {
        await renderCryptoCurrenciesOverview();
        await sleep(5000);
    }
}

app();
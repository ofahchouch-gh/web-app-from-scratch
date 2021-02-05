import { renderCryptoCurrenciesOverview } from './modules/cryptocurrency/overviewController.js';

async function app() {
    while(true) await renderCryptoCurrenciesOverview();
}

app();
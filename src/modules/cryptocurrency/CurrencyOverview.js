import CurrencyOverviewModel from './CurrencyOverviewModel.js';
import CurrencyOverviewController from './CurrencyOverviewController.js';
import Router from './../../router/router.js';

export default class CurrencyOverview {
    router;
    currencyOverviewController;
    currencyOverviewModel;
    
    constructor() {
        this.router = new Router();
        this.currencyOverviewController = new CurrencyOverviewController();
        // this.currencyOverviewModel = new CurrencyOverviewModel();
    }

    async renderOverview() {
        while(true) await this.currencyOverviewController.putOverview();
    }

    routeToCoinDetailView(coinToBeDisplayed) {
        console.log(coinToBeDisplayed);
    }
}


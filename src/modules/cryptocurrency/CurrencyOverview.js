import CurrencyOverviewModel from './CurrencyOverviewModel.js';
import CurrencyOverviewController from './CurrencyOverviewController.js';
import Router from './../../router/router.js';

export default class CurrencyOverview {
    coinDetailViewSectionName;
    router;
    currencyOverviewController;
    currencyOverviewModel;
    
    constructor() {
        this.coinDetailViewSectionName = 'coin';
        this.router = new Router();
        this.currencyOverviewController = new CurrencyOverviewController();
        
        //
        console.log('created new currency overview')
    }

    async renderOverview() {
        while(true) await this.currencyOverviewController.putOverview();
    }

    routeToCoinDetailView(coinToBeDisplayed) {
        this.router.route(this.coinDetailViewSectionName, coinToBeDisplayed);
    }
}


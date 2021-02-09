import CoinDetailView from './../modules/coin/CoinDetailView.js';

routie('overview', () => {
    document.getElementsByTagName('section')[1].style.display = 'none';
    document.getElementsByTagName('section')[0].style.display = 'flex';
});

routie('coin/:nameOfCoinToBeDisplayed', (nameOfCoinToBeDisplayed) => {
    document.getElementsByTagName('section')[0].style.display = 'none';
    document.getElementsByTagName('section')[1].style.display = 'flex';
});

export default class Router {
    constructor() {}

    route(viewToRouteTo, params) {
        if (params === null) {
            routie(viewToRouteTo); 
        } else {
            const coinDetailView = new CoinDetailView();
            coinDetailView.renderDetailView(params);
            
            routie(`${viewToRouteTo}/${params}`);
        }
    }
}
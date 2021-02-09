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
    constructor() {
        window.addEventListener('popstate', function(event) {
            setTimeout(function(){ 
                if (window.location.href.slice(-1) === '/') {
                    window.location = document.referrer;
                }            
             }, 50);
        }, false);
    }

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
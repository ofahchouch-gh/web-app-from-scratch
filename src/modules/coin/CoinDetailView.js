import CoinDetailController from './CoinDetailController.js';
import CoinDetailModel from './CoinDetailModel.js';
import Router from './../../router/router.js';

export default class CoinDetailView {
    currencyOverviewName;
    coinToBeDisplayed;
    router;

    constructor() {
        this.router = new Router();
        this.currencyOverviewName = 'overview';
    }
    
    renderDetailView(coinToBeDisplayed) {
        this.coinToBeDisplayed = coinToBeDisplayed;
        this.createDetailPanel();
    }

    createDetailPanel() {
        let detailSectionDomElement = document.getElementsByTagName('section')[1];

        while (detailSectionDomElement.firstChild) {
            detailSectionDomElement.firstChild.remove()
        }

        detailSectionDomElement.insertAdjacentHTML('beforeend', `<div class="flex-container"></grid-container>`);

        const gridContainerElements = ['header', 'main', 'footer']
        
        let elementCounter = 1;
        for (const element of gridContainerElements) {
            let flexContainerDomElement = document.getElementsByClassName('flex-container')[0];
            let heightOfFlexContainerChild = '';

            switch(element) {
                case 'header':
                    heightOfFlexContainerChild = "20";
                  break;
                case 'main':
                    heightOfFlexContainerChild = "70";
                  break;
                case 'footer':
                    heightOfFlexContainerChild = "10";
                    break;
                default:
              }

              flexContainerDomElement.insertAdjacentHTML('beforeend', `<div class="item${elementCounter}" style=":${heightOfFlexContainerChild}%; width: 100%;"></div>`);

            elementCounter++;
        }

        this.createHeaderInDetailPanel(gridContainerElements);
    }

    createHeaderInDetailPanel(gridContainerElements) {
        const headerGridItemDomElement = document.getElementsByClassName('item1')[0];
        headerGridItemDomElement.insertAdjacentHTML('afterbegin', `<h2 id="back-to-overview">back</h2><h2 style="text-align: center;">${this.coinToBeDisplayed}</h2>`);

        document.getElementById('back-to-overview').addEventListener('click', function () {
            const coinDetailView = new CoinDetailView();
            coinDetailView.routeToCurrencyOverview();
        });  
    }

    routeToCurrencyOverview() {
        this.router.route(this.currencyOverviewName, null);
    }
}
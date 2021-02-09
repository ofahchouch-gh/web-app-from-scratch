import CoinDetailController from './CoinDetailController.js';
import CoinDetailModel from './CoinDetailModel.js';
import Router from './../../router/router.js';

export default class CoinDetailView {
    coinToBeDisplayed;
    router;

    constructor() {
        this.router = new Router(this);
    }
    
    renderDetailView(coinToBeDisplayed) {
        this.coinToBeDisplayed = coinToBeDisplayed;
        this.createDetailPanel();
    }

    createDetailPanel() {
        let detailSectionDomElement = document.getElementsByTagName('section')[1];
        detailSectionDomElement.insertAdjacentHTML('beforeend', `<div class="grid-container"></grid-container>`);

        const gridContainerElements = ['header', 'main', 'footer']
        
        let elementCounter = 1;
        for (const element of gridContainerElements) {
            let gridContainerDomElement = document.getElementsByClassName('grid-container')[0];
            gridContainerDomElement.insertAdjacentHTML('beforeend', `<div class="item${elementCounter}" style="width: 100%; height: 50%; grid-area: ${element};">${element}</div>`);
            elementCounter++;
        }

        this.createHeaderInDetailPanel(gridContainerElements);
    }

    createHeaderInDetailPanel(gridContainerElements) {
        const headerGridItemDomElement = document.getElementsByClassName('item1')[0];
        headerGridItemDomElement.insertAdjacentHTML('afterbegin', `<h2>${this.coinToBeDisplayed}</h2>`);
    }
}
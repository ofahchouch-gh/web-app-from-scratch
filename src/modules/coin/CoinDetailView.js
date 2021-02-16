import CoinDetailController from './CoinDetailController.js';
import CoinDetailModel from './CoinDetailModel.js';
import Router from './../../router/router.js';
import TChart from  './../../libs/tChart.js';

export default class CoinDetailView {
    currencyOverviewName;
    coinToBeDisplayed;
    router;
    coinDetailController;

    constructor() {
        this.router = new Router();
        this.coinDetailController = new CoinDetailController();
        this.currencyOverviewName = 'overview';
    }

    renderDetailView(coinToBeDisplayed) {
        this.coinToBeDisplayed = coinToBeDisplayed;
        this.createDetailPanel();

        //test
        this.coinDetailController.fetchCandleStickDataOfTicker(this.coinToBeDisplayed);
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

            flexContainerDomElement.insertAdjacentHTML('beforeend', `
                <div class="item${elementCounter}" style=":${heightOfFlexContainerChild}%; width: 100%;"></div>
            `);

            elementCounter++;
        }

        this.createHeaderInDetailPanel(gridContainerElements);
    }

    createHeaderInDetailPanel(gridContainerElements) {
        const headerGridItemDomElement = document.getElementsByClassName('item1')[0];
        headerGridItemDomElement.insertAdjacentHTML('afterbegin', `
            <div style="padding-top: 25px; padding-left: 25px;">
                <span id="go-back-to-overview" style="">Top 20 overview</span>
                <span> > ${this.coinToBeDisplayed}</span>
            </div>
            <h2 style="text-align: center;">${this.coinToBeDisplayed}</h2>
        `);

        document.getElementById('go-back-to-overview').addEventListener('click', function () {
            const coinDetailView = new CoinDetailView();
            coinDetailView.routeToCurrencyOverview();
        });  

        //
        this.createLineChart();
    }

    createLineChart() {
        const lineChartData = this.coinDetailController.getLineChartData();

        let targetId1 = "lineChart";
        let canvas1Width = 1200;
        let canvas1Height = 600;

        const mainItemElementInCoinDetailFlexContainer = document.getElementsByClassName('item2')[0];

        mainItemElementInCoinDetailFlexContainer.insertAdjacentHTML('beforeend', 
        `
            <div id="chart">
                <div id="lineChart">This Will Be Our line Chart</div>
            </div>  
        `);
    
        let lineChart = new TChart(targetId1, canvas1Width, canvas1Height, lineChartData);
        lineChart.drawLineChart({ animation: false });
    }

    routeToCurrencyOverview() {
        this.router.route(this.currencyOverviewName, null);
    }
}
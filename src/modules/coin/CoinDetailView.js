import CoinDetailController from './CoinDetailController.js';
import CoinDetailModel from './CoinDetailModel.js';
import Router from './../../router/router.js';

export default class CoinDetailView {
    currencyOverviewName;
    coinToBeDisplayed;
    router;
    coinDetailController;
    coinDetailModel;

    constructor() {
        this.router = new Router();
        this.coinDetailController = new CoinDetailController();
        this.coinDetailModel = this.coinDetailController.coinDetailModel;
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

            flexContainerDomElement.insertAdjacentHTML('beforeend', `
                <div class="item${elementCounter}" style="height:${heightOfFlexContainerChild}%; width: 100%;"></div>
            `);

            elementCounter++;
        }

        this.createHeaderInDetailPanel(gridContainerElements);
        this.createLineChart();
        this.putRecentTradesPanel();
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
    }

    async createLineChart() {
        const mainItemElementInCoinDetailFlexContainer = document.getElementsByClassName('item2')[0];

        mainItemElementInCoinDetailFlexContainer.insertAdjacentHTML('beforeend', 
            `
                <div class="ct-chart ct-perfect-fourth"></div>
                <aside id="lineChartLoader"></aside>
            `
        );

        const cadleSticksOfLastSevenDays = await this.coinDetailController.fetchCandleStickDataOfTicker(this.coinToBeDisplayed);

        let chartData = { labels: [], series: [] };
        let closePrices = [];

        cadleSticksOfLastSevenDays.forEach(candleStick => {
            chartData.labels.push(candleStick.openTime);
            closePrices.push(candleStick.closePrice)
        });
        
        chartData.series.push(closePrices);

        setTimeout(() => {
            new Chartist.Line('.ct-chart', chartData);

            document.getElementById('lineChartLoader').style.display = 'none';
        }, 50);
    }

    async putRecentTradesPanel() {
        const styleOfSpan = `style="flex: 1; text-align: center;"`;

        await this.sleep(1000);
        let currentUrl = window.location.href;

        while(currentUrl.indexOf(this.coinToBeDisplayed.replace(/\s/g, '')) >= 0) {
            currentUrl = window.location.href;

            if(this.coinDetailModel.recentTrades.length > 0) {
                const coinDetailsElement = document.getElementsByClassName('item3')[0];

                Array.prototype.slice.call(document.getElementsByClassName('recent-trades')).forEach(
                    function(item) {
                      item.remove();
                });

                let divWithRecentTrades = '<div class="recent-trades" style="display: flex; flex-direction: column;">';
                this.coinDetailModel.recentTrades.forEach(recentTrade => {
                    divWithRecentTrades += `
                        <div class="row" style="display: flex;">
                            <span ${styleOfSpan}>transaction id: ${recentTrade.id }</span>
                            <span ${styleOfSpan}>price: ${Number(recentTrade.price).toFixed(2) }</span>
                            <span ${styleOfSpan}>quantity: ${recentTrade.qty }</span>
                        </div>
                    `
                });

                divWithRecentTrades += '</div>';

                coinDetailsElement.insertAdjacentHTML('beforeend', divWithRecentTrades);
            }

            await this.sleep(200);
        }
    }

    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    routeToCurrencyOverview() {
        this.router.route(this.currencyOverviewName, null);
    }
}
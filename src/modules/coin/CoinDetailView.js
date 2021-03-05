import CoinDetailController from './CoinDetailController.js';
import Router from './../../router/router.js';
import Sleeper from '../shared/services/Sleeper.js';

export default class CoinDetailView {
    currencyOverviewName;
    coinToBeDisplayed;
    router;
    coinDetailController;
    coinDetailModel;
    sleeper;

    constructor() {
        this.router = new Router();
        this.coinDetailController = new CoinDetailController();
        this.coinDetailModel = this.coinDetailController.coinDetailModel;
        this.currencyOverviewName = 'overview';
        this.sleeper = new Sleeper();
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

        await this.sleeper.sleep(1000);
        let currentUrl = window.location.href;

        while(currentUrl.indexOf(this.coinToBeDisplayed.replace(/\s/g, '')) > 0) {
            currentUrl = window.location.href;

            const cadleSticksOfLastSevenDays = await this.coinDetailController.fetchCandleStickDataOfTicker(this.coinToBeDisplayed);

            let chartData = { labels: [], series: [] };

            chartData.labels = cadleSticksOfLastSevenDays.map(candleStick => {
                return candleStick.openTime;
            });

            const closePrices = cadleSticksOfLastSevenDays.map(candleStick => {
                return candleStick.closePrice;
            });
            
            chartData.series.push(closePrices);

            setTimeout(() => {
                new Chartist.Line('.ct-chart', chartData);

                document.getElementById('lineChartLoader').style.display = 'none';
            }, 50);

            await this.sleeper.sleep(350);
        }
        
        Array.prototype.slice.call(mainItemElementInCoinDetailFlexContainer).reduce((accumulator, currentItem) => { 
            return accumulator - currentItem;
        }, 0);
    }

    async putRecentTradesPanel() {
        const mainItemElementInCoinDetailFlexContainer = document.getElementsByClassName('item3')[0];

        mainItemElementInCoinDetailFlexContainer.insertAdjacentHTML('afterbegin', 
            `
                <aside id="recentTradesLoader"></aside>
            `
        );

        const styleOfSpan = `style="flex: 1; text-align: center;"`;

        await this.sleeper.sleep(1000);
        let currentUrl = window.location.href;

        let recentTradesLoaded = false;

        while(currentUrl.indexOf(this.coinToBeDisplayed.replace(/\s/g, '')) > 0) {
            currentUrl = window.location.href;

            if(this.coinDetailModel.recentTrades.length > 0) {
                const coinDetailsElement = document.getElementsByClassName('item3')[0];

                Array.prototype.slice.call(document.getElementsByClassName('recent-trades')).forEach(
                    (item) => {
                      item.remove();
                    }
                );

                let divWithRecentTrades = '<div class="recent-trades" style="display: flex; flex-direction: column; flex: 1;">';

                const recentTradesHeader = `
                    <div class="row" style="display: flex;">
                        <span ${styleOfSpan}><h2>Recent trades</h2></span>
                    </div>
                `;

                const recentTradesHeading = `
                    <div class="row" style="display: flex;">
                        <span ${styleOfSpan}><b>transaction id</b></span>
                        <span ${styleOfSpan}><b>price (USDT)</b></span>
                        <span ${styleOfSpan}><b>quantity (Satoshis)</b></span>
                    </div>
                `;

                divWithRecentTrades += recentTradesHeader;
                divWithRecentTrades += recentTradesHeading;
                
                this.coinDetailModel.recentTrades.forEach(recentTrade => {
                    divWithRecentTrades += `
                        <div class="row" style="display: flex;">
                            <span ${styleOfSpan}>${recentTrade.id }</span>
                            <span ${styleOfSpan}>$${Number(recentTrade.price).toFixed(2) }</span>
                            <span ${styleOfSpan}>${recentTrade.qty }</span>
                        </div>
                    `
                });

                divWithRecentTrades += '</div>';

                if(!recentTradesLoaded) {
                    document.getElementById('recentTradesLoader').style.display = 'none';
                    recentTradesLoaded = true;
                }

                coinDetailsElement.insertAdjacentHTML('beforeend', divWithRecentTrades);
            }

            await this.sleeper.sleep(200);
        }
    }

    routeToCurrencyOverview() {
        this.router.route(this.currencyOverviewName, null);
    }
}
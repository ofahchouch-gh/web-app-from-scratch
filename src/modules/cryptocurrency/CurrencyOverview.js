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
    }

    async renderOverview() {
        while(true) await this.putOverview();
    }

    async putOverview() {
        const listOfMostPopularCryptoBidPrices = await this.currencyOverviewController.fetchAllHighestBidAndLowestAskPricesWithProfitOrLossOfMostPopularCrypto();
        let tableSectionDomElement = document.getElementsByTagName('section')[0];
    
        const tableWithCryptoCurrenciesToBeDisplayed = this.putTable(listOfMostPopularCryptoBidPrices);
    
        tableSectionDomElement.insertAdjacentHTML('beforeend', tableWithCryptoCurrenciesToBeDisplayed);
        this.styleProfitOrLossTableData();
        this.currencyOverviewController.addRoutingEventListenersToTableData();
    }

    putTable(listOfMostPopularCryptoBidPrices) {
        this.clearTable();
        let tableWithCryptoCurrenciesToBeDisplayed = '<table>';

        const tableHeadingOfCryptoCurrenciesTable = this.putTableHeading(listOfMostPopularCryptoBidPrices);
        tableWithCryptoCurrenciesToBeDisplayed += tableHeadingOfCryptoCurrenciesTable;
        
        const rowsOfTableDataOfCryptoCurrenciesTable = this.putTableRowData(listOfMostPopularCryptoBidPrices);
        tableWithCryptoCurrenciesToBeDisplayed += rowsOfTableDataOfCryptoCurrenciesTable;
    
        tableWithCryptoCurrenciesToBeDisplayed += '</table>';

        return tableWithCryptoCurrenciesToBeDisplayed;
    }

    putTableRowData(listOfDataAboutCryptoObject) {
        let rowsOfTableDataForCryptoCurrenciesTable = '';
        let currentPropertyToBeSetInTableDataCounter = 0;
        
        for(const propertyOfPopularCrypto in listOfDataAboutCryptoObject[0]) {
            let tableRowWithTableDataForCryptoCurrenciesTable = '<tr>';
            let listOfTableDataWithPopularCrypto = '';
        
            for(const popularCrypto of listOfDataAboutCryptoObject) {
                let tableDataWithPopularCrypto = '<td>';
                
                let currentPropertyToString = Object.keys(popularCrypto)[currentPropertyToBeSetInTableDataCounter];
                
                if(currentPropertyToString === Object.keys(popularCrypto)[0]) {
                    tableDataWithPopularCrypto += this.addIconAsImgTagOfTickerToBeDisplayedInTableData(popularCrypto);
                    tableDataWithPopularCrypto += '&nbsp; ';
                }

                tableDataWithPopularCrypto +=  popularCrypto[currentPropertyToString]

                tableDataWithPopularCrypto += '</td>';
                listOfTableDataWithPopularCrypto += tableDataWithPopularCrypto;
            }

            currentPropertyToBeSetInTableDataCounter++;

            tableRowWithTableDataForCryptoCurrenciesTable += listOfTableDataWithPopularCrypto;
            tableRowWithTableDataForCryptoCurrenciesTable += '</tr>';
            rowsOfTableDataForCryptoCurrenciesTable += tableRowWithTableDataForCryptoCurrenciesTable;
        }

        return rowsOfTableDataForCryptoCurrenciesTable;
    }

    putTableHeading(listOfMostPopularCryptoBidPrices) {
        let tableHeadingForCryptoCurrenciesTable = '<thead>';
        let tableHeadingRowForCryptoCurrenciesTable = '<tr>';

        for(const propertyOfPopularCrypto in listOfMostPopularCryptoBidPrices[0]) {
            let tableHeadingOfPopularCryptoProperty = '<th>';
            tableHeadingOfPopularCryptoProperty += propertyOfPopularCrypto;
            tableHeadingOfPopularCryptoProperty += '</th>';
            tableHeadingRowForCryptoCurrenciesTable += tableHeadingOfPopularCryptoProperty;
        }
        
        tableHeadingRowForCryptoCurrenciesTable += '</tr>';
        tableHeadingForCryptoCurrenciesTable += tableHeadingRowForCryptoCurrenciesTable;
        tableHeadingForCryptoCurrenciesTable += '</thead>';

        return tableHeadingForCryptoCurrenciesTable;
    }

    addIconAsImgTagOfTickerToBeDisplayedInTableData(ticker) {
        const nameOfTicker = ticker[Object.keys(ticker)[0]];
        const slicedAndToLowerCaseNameOfTicker = nameOfTicker.slice(0, -4).toLowerCase();
        const iconAsImgTagOfTickerToBeAddedToTableData = `<img src="./src/assets/imgs/icons/${slicedAndToLowerCaseNameOfTicker}.png"` +
        `width="12px" height="12px" alt="${nameOfTicker}_icon">`;

        return iconAsImgTagOfTickerToBeAddedToTableData;
    }

    clearTable() {
        if(document.getElementsByTagName('aside')[0].style.display !== 'none')  document.getElementsByTagName('aside')[0].style.display = 'none';
    
        let tableDomElement = document.getElementsByTagName('table')[0];
        
        if(typeof tableDomElement !== 'undefined') {
            Array.prototype.slice.call(document.getElementsByTagName('table')).forEach(
                (item) => {
                  item.remove();
            });
        }
    }

    styleProfitOrLossTableData() {
        const profitOrLossTableRowElement = document.getElementsByTagName('tr')[4];
        
        for(let tableDataChildNode of profitOrLossTableRowElement.childNodes) {
            if (parseFloat(tableDataChildNode.innerText) > (0.00)) {
                tableDataChildNode.style.color = 'mediumseagreen';
                tableDataChildNode.insertAdjacentHTML('afterbegin', '<span>&#10138; </span>');
            } else if (parseFloat(tableDataChildNode.innerText) < (0.00)) {
                tableDataChildNode.style.color = 'firebrick';
                tableDataChildNode.insertAdjacentHTML('afterbegin', '<span>&#10136; </span>');
            }
        }
    }

    routeToCoinDetailView(coinToBeDisplayed) {
        this.router.route(this.coinDetailViewSectionName, coinToBeDisplayed);
    }
}


import BinanceApiHandler from '../binance/BinanceApiHandler.js';

export default class CurrencyOverviewController {
    currencyOverviewModel;
    binanceApiHandler;
    listOfMostPopularCryptoTickerNames;
    
    constructor() {
        this.listOfMostPopularCryptoTickerNames = [ 'BTCUSDT', 
            'ETHUSDT', 'XRPUSDT', 'DASHUSDT',
            'XLMUSDT', 'LTCUSDT', 'DOGEUSDT',
            'ADAUSDT', 'DOTUSDT', 'NEOUSDT',
            'LINKUSDT', 'XMRUSDT', 'BNBUSDT',
            'EOSUSDT', 'VETUSDT', 'BCHUSDT',
            'ZECUSDT', 'VETUSDT', 'TRXUSDT',
            'XEMUSDT'
        ];

        this.binanceApiHandler = new BinanceApiHandler();
    }

    clearTable() {
        if(document.getElementsByTagName('aside')[0].style.display !== 'none')  document.getElementsByTagName('aside')[0].style.display = 'none';
    
        let tableDomElement = document.getElementsByTagName('table')[0];
        
        if(typeof tableDomElement !== 'undefined') {
            Array.prototype.slice.call(document.getElementsByTagName('table')).forEach(
                function(item) {
                  item.remove();
            });
        }
    }

    styleProfitOrLossTableData() {
        const profitOrLossTableRowElement = document.getElementsByTagName('tr')[4];
        
        for(let tableDataChildNode of profitOrLossTableRowElement.childNodes) {
            if (parseFloat(tableDataChildNode.innerText) > (0.00)) {
                tableDataChildNode.style.color = 'mediumseagreen';
                tableDataChildNode.insertAdjacentHTML('afterbegin', "<span>&#10138; </span>");
            } else if (parseFloat(tableDataChildNode.innerText) < (0.00)) {
                tableDataChildNode.style.color = 'firebrick';
                tableDataChildNode.insertAdjacentHTML('afterbegin', "<span>&#10136; </span>");
            }
        }
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


}

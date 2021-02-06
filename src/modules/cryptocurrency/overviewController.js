import { fetchBidAndAskPriceOfSpecificTicker, getLowestBidPriceOfFetchedTicker, getHighestAskPriceOfFetchedTicker } from '../binance/apiHandler.js';

const listOfMostPopularCryptoTickerNames = [
    'BTCUSDT',
    'ETHUSDT',
    'XRPUSDT',
    'XLMUSDT',
    'LTCUSDT',
    'DOGEUSDT',
    'ADAUSDT',
    'DOTUSDT',
    'NEOUSDT',
    'LINKUSDT',
    'XMRUSDT',
    'BNBUSDT',
    'EOSUSDT',
    'VETUSDT',
    'BCHUSDT',
    'ZECUSDT',
    'DASHUSDT',
    'TRXUSDT',
    'XEMUSDT',
    'VETUSDT'
];

function createTable(listOfDataAboutCryptoObject) {
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

function createTableHeadingRow(listOfMostPopularCryptoBidPrices) {
    let tableHeadingRowForCryptoCurrenciesTable = '<tr>';

    for(const propertyOfPopularCrypto in listOfMostPopularCryptoBidPrices[0]) {
        let tableHeadingOfPopularCryptoProperty = '<th>';
        tableHeadingOfPopularCryptoProperty += propertyOfPopularCrypto;
        tableHeadingOfPopularCryptoProperty += '</th>';
        tableHeadingRowForCryptoCurrenciesTable += tableHeadingOfPopularCryptoProperty;
    }
    
    tableHeadingRowForCryptoCurrenciesTable += '</tr>';

    return tableHeadingRowForCryptoCurrenciesTable;
}

function createTableHeading(listOfMostPopularCryptoBidPrices) {
    let tableHeadingForCryptoCurrenciesTable = '<thead>';

    tableHeadingForCryptoCurrenciesTable += createTableHeadingRow(listOfMostPopularCryptoBidPrices);

    tableHeadingForCryptoCurrenciesTable += '</thead>';

    return tableHeadingForCryptoCurrenciesTable;
}

function clearTable() {
    if(document.getElementsByTagName('aside')[0].style.display !== 'none')  document.getElementsByTagName('aside')[0].style.display = 'none';

    let tableDomElement = document.getElementsByTagName('table')[0];
    
    if(typeof tableDomElement !== 'undefined') {
        Array.prototype.slice.call(document.getElementsByTagName('table')).forEach(
            function(item) {
              item.remove();
        });
    }
}

function createTableWithCryptoCurrencies(listOfMostPopularCryptoBidPrices) {
    clearTable();
    let tableWithCryptoCurrenciesToBeDisplayed = '<table>';

    const tableHeadingOfCryptoCurrenciesTable = createTableHeading(listOfMostPopularCryptoBidPrices);
    tableWithCryptoCurrenciesToBeDisplayed += tableHeadingOfCryptoCurrenciesTable;

    const rowsOfTableDataOfCryptoCurrenciesTable = createTable(listOfMostPopularCryptoBidPrices);
    tableWithCryptoCurrenciesToBeDisplayed += rowsOfTableDataOfCryptoCurrenciesTable;

    tableWithCryptoCurrenciesToBeDisplayed += '</table>';

    return tableWithCryptoCurrenciesToBeDisplayed;
}

function styleProfitOrLossTableData() {
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

export async function fetchAllHighestBidAndLowestAskPricesWithProfitOrLossOfMostPopularCrypto() {
    let listOfMostPopularCryptoBidPrices = [];
    
    for(const popularCryptoTickerName of listOfMostPopularCryptoTickerNames) {
        const fetchedBidAndAskPriceOfSpecificTicker = await fetchBidAndAskPriceOfSpecificTicker(popularCryptoTickerName);
        const lowestBidPriceOfFetchedTicker = Number.parseFloat(getLowestBidPriceOfFetchedTicker(fetchedBidAndAskPriceOfSpecificTicker)).toFixed(2);
        const highestAskPriceOfFetchedTicker = Number.parseFloat(getHighestAskPriceOfFetchedTicker(fetchedBidAndAskPriceOfSpecificTicker)).toFixed(2);
        const potentialProfitOrLossThatCouldBeMade = Number.parseFloat((highestAskPriceOfFetchedTicker - lowestBidPriceOfFetchedTicker)).toFixed(2);

        listOfMostPopularCryptoBidPrices.push({ 
            'Popular crypto ticker name (USDT)': popularCryptoTickerName,
            'Current avg. lowest bid price ($/USDT)': lowestBidPriceOfFetchedTicker,
            'Current avg. highest ask price ($/USDT)': highestAskPriceOfFetchedTicker,
            'Current avg. profit/loss with 1 coin ($/USDT)': potentialProfitOrLossThatCouldBeMade
        });
    }

    return listOfMostPopularCryptoBidPrices;
}

export async function renderCryptoCurrenciesOverview() {
    const listOfMostPopularCryptoBidPrices = await fetchAllHighestBidAndLowestAskPricesWithProfitOrLossOfMostPopularCrypto();
    let tableSectionDomElement = document.getElementsByTagName('section')[0];

    const tableWithCryptoCurrenciesToBeDisplayed = createTableWithCryptoCurrencies(listOfMostPopularCryptoBidPrices);

    tableSectionDomElement.insertAdjacentHTML('beforeend', tableWithCryptoCurrenciesToBeDisplayed);
    styleProfitOrLossTableData();
}
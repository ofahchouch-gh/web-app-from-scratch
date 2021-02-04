import { fetchBidAndAskPriceOfSpecificTicker, getHighestBidPriceOfFetchedTicker } from '../binance/binanceApiHandler.js';

function getListOfMostPopularCryptoCurrencies() {
    const listOfMostPopularCryptoTickerNames = [
        'BTCUSDT',
        'ETHUSDT',
        'XRPUSDT',
        'XLMUSDT',
        'ADAUSDT',
        'DOTUSDT',
        'NEOUSDT',
        'LINKUSDT',
        'XMRUSDT',
        'BNBUSDT'
    ];

    return listOfMostPopularCryptoTickerNames;
}

function createTableDataForCryptoCurrenciesTable(listOfDataAboutCryptoObject) {
    let rowsOfTableDataForCryptoCurrenciesTable;
    let currentPropertyToBeSetInTableDataCounter = 0;
    
    for(const propertyOfPopularCrypto in listOfDataAboutCryptoObject[0]) {
        let tableRowWithTableDataForCryptoCurrenciesTable = '<tr>';
        let listOfTableDataWithPopularCrypto;
    
        for(const popularCrypto of listOfDataAboutCryptoObject) {
            let tableDataWithPopularCrypto = '<td>';
    
            let currentPropertyToString = Object.keys(popularCrypto)[currentPropertyToBeSetInTableDataCounter];
            tableDataWithPopularCrypto +=  eval('popularCrypto.' + currentPropertyToString);

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

function createTableHeadingForCryptoCurrenciesTable(listOfMostPopularCryptoBidPrices) {
    let tableHeadingForCryptoCurrenciesTable = '<thead>';

    tableHeadingForCryptoCurrenciesTable += createTableHeadingRowForCryptoCurrenciesTable(listOfMostPopularCryptoBidPrices);

    tableHeadingForCryptoCurrenciesTable += '</thead>';

    return tableHeadingForCryptoCurrenciesTable;
}

function createTableHeadingRowForCryptoCurrenciesTable(listOfMostPopularCryptoBidPrices) {
    let tableHeadingRowForCryptoCurrenciesTable = '<tr>';

    for(const propertyOfPopularCrypto in listOfMostPopularCryptoBidPrices[0]) {
        let tableHeading = '<th>';
        tableHeading += propertyOfPopularCrypto;
        tableHeading += '</th>';
        tableHeadingRowForCryptoCurrenciesTable += tableHeading;
    }
    
    tableHeadingRowForCryptoCurrenciesTable += '</tr>';

    return tableHeadingRowForCryptoCurrenciesTable;
}

function createTableWithCryptoCurrencies(listOfMostPopularCryptoBidPrices) {
    let tableWithCryptoCurrenciesToBeDisplayed = '<table>';

    const tableHeadingOfCryptoCurrenciesTable = createTableHeadingForCryptoCurrenciesTable(listOfMostPopularCryptoBidPrices);
    tableWithCryptoCurrenciesToBeDisplayed += tableHeadingOfCryptoCurrenciesTable;

    const rowsOfTableDataOfCryptoCurrenciesTable = createTableDataForCryptoCurrenciesTable(listOfMostPopularCryptoBidPrices);
    tableWithCryptoCurrenciesToBeDisplayed += rowsOfTableDataOfCryptoCurrenciesTable;

    tableWithCryptoCurrenciesToBeDisplayed += '</table>';

    return tableWithCryptoCurrenciesToBeDisplayed;
}

export async function fetchAllHighestBidPricesOfMostPopularCrypto() {
    const listOfMostPopularCryptoTickerNames = getListOfMostPopularCryptoCurrencies();
    let listOfMostPopularCryptoBidPrices = [];
    
    for(const popularCryptoTickerName of listOfMostPopularCryptoTickerNames) {
        const fetchedBidAndAskPriceOfSpecificTicker = await fetchBidAndAskPriceOfSpecificTicker(popularCryptoTickerName);
        const highestBidPriceOfFetchedTicker = getHighestBidPriceOfFetchedTicker(fetchedBidAndAskPriceOfSpecificTicker);

        listOfMostPopularCryptoBidPrices.push({ popularCryptoTickerName: popularCryptoTickerName,
            highestBidPriceOfFetchedTicker: highestBidPriceOfFetchedTicker
        });
    }

    return listOfMostPopularCryptoBidPrices;
}

export async function renderCryptoCurrenciesOverview() {
    const listOfMostPopularCryptoBidPrices = await fetchAllHighestBidPricesOfMostPopularCrypto();
    let tableSectionDomElement = document.getElementsByTagName('section')[0];
    const tableWithCryptoCurrenciesToBeDisplayed = createTableWithCryptoCurrencies(listOfMostPopularCryptoBidPrices);

    tableSectionDomElement.insertAdjacentHTML('beforeend', tableWithCryptoCurrenciesToBeDisplayed);
}
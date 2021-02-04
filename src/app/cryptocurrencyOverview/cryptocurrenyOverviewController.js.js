import { fetchSpecificTicker, getHighestBidPriceOfFetchedTicker } from '../binance/binanceApiHandler.js';

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

function createTableDataForCryptoCurrenciesTable(listOfMostPopularCryptoBidPrices) {
    let rowsOfTableDataForCryptoCurrenciesTable;
    let tableRowWithTableDataForCryptoCurrenciesTable = '<tr>';

    for(const popularCrypto of listOfMostPopularCryptoBidPrices) {
        let tableDataWithPopularCrypto = '<td>';
        tableDataWithPopularCrypto += popularCrypto.popularCryptoTickerName;
        tableDataWithPopularCrypto += '</td>';

        tableRowWithTableDataForCryptoCurrenciesTable += tableDataWithPopularCrypto;
    }

    tableRowWithTableDataForCryptoCurrenciesTable += '</tr>';
    rowsOfTableDataForCryptoCurrenciesTable += tableRowWithTableDataForCryptoCurrenciesTable;

    return rowsOfTableDataForCryptoCurrenciesTable;
}

async function createTableHeadingForCryptoCurrenciesTable() {
    let tableHeadingRowForCryptoCurrenciesTable = '<tr>';
    
    // moet nog dynamisch worden
    let tableHeading = '<th>';
    tableHeading += 'ticker name';
    tableHeading += '</th>';
    tableHeadingRowForCryptoCurrenciesTable += tableHeading;
    
    tableHeadingRowForCryptoCurrenciesTable += '</tr>';

    return tableHeadingRowForCryptoCurrenciesTable;
}

function createTableWithCryptoCurrencies(listOfMostPopularCryptoBidPrices) {
    let tableWithCryptoCurrenciesToBeDisplayed = '<table>';

    const tableHeadingOfCryptoCurrenciesTable = createTableHeadingForCryptoCurrenciesTable();
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
        const fetchedTicker = await fetchSpecificTicker(popularCryptoTickerName);
        const highestBidPriceOfFetchedTicker = getHighestBidPriceOfFetchedTicker(fetchedTicker);

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
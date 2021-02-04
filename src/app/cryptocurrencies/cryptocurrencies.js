import { fetchSpecificTicker, getHighestBidPriceOfFetchedTicker } from '../binance/binanceApiHandler.js';







function createTableWithCryptoCurrencies(listOfMostPopularCryptoBidPrices) {
    let tableSectionDomElement = document.getElementsByTagName('section')[0];

    let tableWithCryptoCurrenciesToBeDisplayed = '<table>';

    tableHeadingOfCryptoCurrenciesTable = createTableHeadingForCryptoCurrenciesTable();
    tableWithCryptoCurrenciesToBeDisplayed += tableHeadingOfCryptoCurrenciesTable;

    rowsOfTableDataOfCryptoCurrenciesTable = createTableDataForCryptoCurrenciesTable();
    tableWithCryptoCurrenciesToBeDisplayed += rowsOfTableDataOfCryptoCurrenciesTable;

    tableWithCryptoCurrenciesToBeDisplayed += '</table>';

    tableSectionDomElement.insertAdjacentHTML('beforeend', tableWithCryptoCurrenciesToBeDisplayed);

    // <table>
    //     <tr>
    //         <th>Firstname</th>
    //         <th>Lastname</th>
    //         <th>Age</th>
    //     </tr>
    //     <tr>
    //         <td>Jill</td>
    //         <td>Smith</td>
    //         <td>50</td>
    //     </tr>
    //     <tr>
    //         <td>Eve</td>
    //         <td>Jackson</td>
    //         <td>94</td>
    //     </tr>
    // </table>
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

    // zet hier de table in de section 

    // test
    createTableHeadingForCryptoCurrenciesTable();
}
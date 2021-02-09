routie('overview', () => {
    console.log('overview..');
    // render currency overview
});

routie('coin/:nameOfCoinToBeDisplayed', (nameOfCoinToBeDisplayed) => {
    console.log(nameOfCoinToBeDisplayed);
    // render coin detail view
});

export default class Router {
    route(viewToRouteTo, params) {
        if (params === null) {
            routie(viewToRouteTo); 
        } else {
            routie(`${viewToRouteTo}/${params}`);
        }
    }
}
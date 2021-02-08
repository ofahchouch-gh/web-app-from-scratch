routie('overview', function() {
    // render currency overview
});

routie('coin/:name', function(name) {
    // render coin detail view
});

routie('*', function() {
    // render main with currency overview
});

// export class Router {
//     route(viewToRouteTo, params) {
//         if (params === null) {
//             routie(viewToRouteTo); 
//         } else {
//             routie(`${viewToRouteTo}/${params}`);
//         }
//     }
// }

export function route(viewToRouteTo, params) {
    if (params === null) {
        routie(viewToRouteTo); 
    } else {
        routie(`${viewToRouteTo}/${params}`);
    }
}
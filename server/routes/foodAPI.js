const fs = require('fs');
const sdk = require('api')('@fsq-developer/v1.0#x6xjhzlic2gi70');
// const { admin, db, collection } = require('.././index.js');


let categories = {
    Dining: '13000',
    Restaurants: '13065',
    Cafes: '13032',
    Desserts: '13040',
    Bakery: '13002',
    NightMarket: '13062',
    KaraokeBar: '13015',
    RooftopBar: '13019',
    BreakfastSpot: '13028',
    Bistro: '13027',
    CafeCoffee: '13032',
    Buffet: '13030',

  };

sdk.auth('fsq3Nq0mkZ3S3E6kiHea7RjQXE+XsDmAnkvZKzvsJOpGcQE=');
async function getFoodOptions(cat, cat_id, country) {
    return sdk.placeSearch({
        query: cat.toString(),  // keyword search
        ll: country.toString(), // the lat/long for Singapore // ideally should be airbnb location
        radius: 10000,  // search within a radius (in terms of m)
        categories: cat_id.toString(),
        fields: 'fsq_id%2Cname%2Cgeocodes%2Clocation%2Cchains%2Chours%2Crating%2Cpopularity%2Cprice%2Cphotos',
        sort: 'RATING', // sort by rating
        
    })
    .then(({ data }) => {
        // console.log(data);
        return data;
    })
    .catch(err => console.error(err));
}

async function getAllFood(latlong) {
    console.log(latlong);
    console.log(typeof(latlong));
    var aggregatedResults = [];

    for (let cate in categories) {
        const cat = cate;
        const cat_id = categories[cate];
        const country = latlong;

        try {
            const response = await getFoodOptions(cat, cat_id, country);
            const results = response.results;
            results.forEach(result => {
                result.activity_duration = 1;
                result.category = "1000"
            });
            // console.log(results);
            aggregatedResults.push(...results);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }
    return aggregatedResults;
}


module.exports = {
    processFood: async function(accoms) {
        try {
            const list = await getAllFood(accoms);
            console.log(list);
            return list;
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }  
};
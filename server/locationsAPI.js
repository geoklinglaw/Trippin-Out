// API Key = fsq3Nq0mkZ3S3E6kiHea7RjQXE+XsDmAnkvZKzvsJOpGcQE=
// Generates list of locations based on categories and search query
// DO NOT USE IMPORT FOR COMMON JS MODULES
const { get } = require('http');
const data = require('./rankingtest.json');
const fs = require('fs');
const sdk = require('api')('@fsq-developer/v1.0#x6xjhzlic2gi70');


data.sort((a, b) => {
    return a.rank - b.rank;
});

// console.log(data);

const numDays = 5; // number of days

// Generates the number of locations that would be provided to the user based on the number of days and its rank
const rankRule = {
    1: (numDays * 8),
    2: (numDays * 7),
    3: (numDays * 6),
    4: (numDays * 5),
    5: (numDays * 4),
    6: (numDays * 3),
    // 7: (numDays * 2),
    // 8: (numDays * 1),
  };

  // Obtain the list of locations based on the rank rule
  // for example: the category that is ranked 1 will have 40 locations assuming duration of travel is 5 days (5 * 8)
  async function obtainListOfLocations(data, rankRule) {
    const destination_location = '1.3521,103.8198'; // Singapore
    let locations = [];

    for (let i = 0; i < data.length; i++) {
        const category = data[i].category;
        const category_id = data[i].category_id;
        const numberOfResultsPerCategory = rankRule[data[i].rank];

        try {
            const results = await getListPerCategory(category, category_id, destination_location);

            if (results && results.results && results.results.length > 0) {
                // Take only the first n results
                const limitedResults = results.results.slice(0, numberOfResultsPerCategory); // GOT ERROR HERE DK WHY RESULTS.RESULTS DOESNT WORK :(
                locations = locations.concat(limitedResults);
            } else {
                console.log(`No results for category ${category}`); 
            }
        } catch (error) {
            console.error(`Error retrieving results for category ${category}: ${error}`);
        }
    }

    // Here locations will be an array containing n results from each category
    console.log(locations);
    return locations;
}

// PLACES API
const categories = [
    '10000', // Arts & Entertainment
    '13000', // Dining & Drinking
    '13065', // Restaurants
    '13032', // Cafes
    '13040', // Desserts
    '13002', // Bakery
    '13062', // Night Market
    '10032', // Night Clubs
    '13003', // Bars
    '10027', // Museums
    '16020', // Historic and Protected Sites
    '16000', // Landmark & Outdoors
    '16032', // Parks
    '14003', // Entertainment Events
];

sdk.auth('fsq3Nq0mkZ3S3E6kiHea7RjQXE+XsDmAnkvZKzvsJOpGcQE=');
async function getListPerCategory(cat, cat_id, country) {
    sdk.placeSearch({
        query: cat.toString(),  // keyword search
        ll: country.toString(), // the lat/long for Singapore // ideally should be airbnb location
        radius: 10000,  // search within a radius (in terms of m)
        categories: cat_id.toString(),
        fields: 'fsq_id%2Cname%2Cgeocodes%2Clocation%2Cchains%2Chours%2Crating%2Cpopularity%2Cprice',
        sort: 'RATING', // sort by rating
        
    })
    .then(({ data }) => {
        // console.log(data);
        return data;
    })
    .catch(err => console.error(err));
}

// find lat long based on country

// getListPerCategory('Night Clubs', '10032', '1.3521,103.8198');
obtainListOfLocations(data, rankRule)
    .then(list => {
        console.log(list);
        fs.writeFile('tempLocations1.json', JSON.stringify(list, null, 2), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    })
    .catch(error => {
        console.error(`Error: ${error}`);
    });
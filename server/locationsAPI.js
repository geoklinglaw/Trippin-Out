// API Key = fsq3Nq0mkZ3S3E6kiHea7RjQXE+XsDmAnkvZKzvsJOpGcQE=
// Generates list of locations based on categories and search query

// PLACES API
const fs = require('fs');
const sdk = require('api')('@fsq-developer/v1.0#x6xjhzlic2gi70');

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
async function getListPerCategory(cat) {
    sdk.placeSearch({
        query: cat.toString(),  // keyword search
        ll: '1.3521,103.8198', // the lat/long for Singapore
        radius: 10000,  // search within a radius (in terms of m)
        categories: '13000',
        sort: 'RATING', // sort by rating
    })
    .then(({ data }) => {
        console.log(data);
        
        fs.writeFile('tempLocations.json', JSON.stringify(data, null, 2), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    })
    .catch(err => console.error(err));
}

// find lat long based on country


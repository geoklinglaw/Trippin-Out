const fs = require('fs');
const sdk = require('api')('@fsq-developer/v1.0#x6xjhzlic2gi70');
const { admin, db, collection } = require('./index.js');


let categories = {
    Dining: '13000',
    Restaurants: '13065',
    Cafes: '13032',
    Desserts: '13040',
    Bakery: '13002',
    NightMarket: '13062'
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
    // const userID = 'pVOrWYawmnkMvUu3IFtn';
    // const tripID = 'V1NBZp7HSK7hnEkKT0Aw';
    var aggregatedResults = [];

    for (let cate in categories) {
        const cat = cate;
        const cat_id = categories[cate];
        const country = latlong;

        try {
            const response = await getFoodOptions(cat, cat_id, country);
            const results = response.results;
            console.log(results);
            aggregatedResults.push(...results);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    function generateUniqueFilename(prefix) {
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
        return `${prefix}_${timestamp}.json`;
    }
    const filename = generateUniqueFilename('food_options');
    fs.writeFile(`${filename}`, JSON.stringify(aggregatedResults, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

        // for (let result of response.results) {
            // add to firebase database
            // const foodDB = await db.collection('users').doc(userID).collection('trips').doc(tripID).collection('food').add ({
            //     name: result.name,
            //     address: result.location.formatted_address,
            //     rating: result.rating,
            //     hours: result.hours,
            //     outlet: result.chains,
            // });
    
            // data.push(result);
        // }
        
    
        // var results = await getFoodOptions(cat, cat_id, country);
        // const foodInfo = {
        //     name: results.name,
        //     // address: results.location.formatted_address,
        //     rating: results.results.rating,
        //     hours: results.results.hours,
        //     outlet: results.results.chains,
        // }
        // console.log(foodInfo);

        // // const foodDB =  await db.collection('users').doc(userID).collection('trips').doc(tripID).collection('food').add ({
        // //     name: foodInfo.name,
        // //     // address: foodInfo.address,
        // //     rating: foodInfo.rating,
        // //     hours: foodInfo.hours,
        // //     outlet: foodInfo.chains,
        // //     // price: location.price
        // // });
        // data.push(results);
    
}

// ------------------ UNIT TEST ------------------ //
// Obtain list of food options in Singapore
getAllFood('1.3521,103.8198')
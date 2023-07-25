// API Key = fsq3Nq0mkZ3S3E6kiHea7RjQXE+XsDmAnkvZKzvsJOpGcQE=
// Generates list of locations based on categories and search query
// DO NOT USE IMPORT FOR COMMON JS MODULES
const { get } = require('http');
// const data = require('../rankingtest.json');
const fs = require('fs');
const { DocumentSnapshot } = require('firebase-admin/firestore');
const sdk = require('api')('@fsq-developer/v1.0#x6xjhzlic2gi70');


  // Obtain the list of locations based on the rank rule
  // for example: the category that is ranked 1 will have 40 locations assuming duration of travel is 5 days (5 * 8)
  async function obtainListOfLocations(data, rankRule, destination) {
    // const destination_location = '1.3521,103.8198'; // Singapore '37.5519,126.9918'; // Korea
    const destination_location = destination;
    let locations = [];

    for (let i = 0; i < data.length; i++) {
        const category = data[i].category;
        const category_id = data[i].category_id;
        const numberOfResultsPerCategory = rankRule[data[i].rank];
        const duration = data[i].activity_duration;

        try {
            const results = await getListPerCategory(category, category_id, duration, destination_location);

            if (results && results.results && results.results.length > 0) {
                const limitedResults = results.results.slice(0, numberOfResultsPerCategory); // GOT ERROR HERE DK WHY RESULTS.RESULTS DOESNT WORK :(
                locations = locations.concat(limitedResults);
            } else {
                console.log(`No results for category ${category}`); 
            }
        } catch (error) {
            console.error(`Error retrieving results for category ${category}: ${error}`);
        }
    }

    // console.log(locations);
    return locations;
}


    sdk.auth('fsq3Nq0mkZ3S3E6kiHea7RjQXE+XsDmAnkvZKzvsJOpGcQE=');
    async function getListPerCategory(cat, cat_id, duration, country) {
        console.log(duration)
        return sdk.placeSearch({
            query: cat.toString(),  // keyword search
            ll: country, // the lat/long for Singapore // ideally should be airbnb location
            radius: 50000,  // search within a radius (in terms of m)
            categories: cat_id.toString(),
            fields: 'fsq_id%2Cname%2Cgeocodes%2Clocation%2Cchains%2Chours%2Crating%2Cpopularity%2Cprice%2Cphotos',
            sort: 'RATING', // sort by rating
            
        })
        .then(({ data }) => {
            if (data && Array.isArray(data.results)) {
                // Append activity_duration to each item in results array
                data.results.forEach(item => {
                    item.activity_duration = duration;
                    item.category = cat_id;
                });
                // console.log(data)
                return data
            } else {
                return []; // return an empty array if data doesn't have results or results is not an array
            }
        })
        .catch(err => console.error(err));
    }

// getListPerCategory('Night Clubs', '10032', 3, '1.3521,103.8198');
// find lat long based on country

// getListPerCategory('Night Clubs', '10032', '1.3521,103.8198');
// obtainListOfLocations(data, rankRule)
//     .then(list => {
//     })
//     .catch(error => {
//         console.error(`Error: ${error}`);
//     });

    // async function fetchfromFirebase() {
    //     const { db } = require('.././index.js');
    //     const userID = "dBLCC8TXlrYkYQXDZ7f5eFyvex92" // "pVOrWYawmnkMvUu3IFtn";
    //     const tripID = "sdIccla3xbdTQLpCjn7Y" // "V1NBZp7HSK7hnEkKT0Aw";
        
    //     const destinationRef = db.doc(`users/${userID}/trips/${tripID}`);
    //     const DocumentSnapshot = await destinationRef.get();
    //     let data = DocumentSnapshot.data();
    //     const accommodation = data.latlong;
    //     const duration = data.Duration; // Note the capitalized 'D'
    //     return [accommodation, duration];    
            
    // };
    
        // if (destinationSnap.exists()) {
        //   const accommodation = destinationSnap.data().latlong;
        //   const duration = destinationSnap.data().duration;
        //   return [accommodation, duration];
        // } else {
        //   console.error("No such document exists!");
        // }
    

  // Generates the number of locations that would be provided to the user based on the number of days and its rank
  const rankRule = (numDays) =>{
    return {
        1: (numDays * 10),
        2: (numDays * 8),
        3: (numDays * 8),
        4: (numDays * 6),
        5: (numDays * 5),
        6: (numDays * 5),
        };
    };
    
module.exports = {
    processPreferences: async function(preference, accoms, duration) {
        const preferences = preference.sort((a, b) => {
            return a.rank - b.rank;
        });

        try {
            // console.log(destination_location, duration);
            const rank = rankRule(duration);
            // console.log(rank);
            const list = await obtainListOfLocations(preferences, rankRule, accoms);
            console.log(list);
            return list;
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }  
};
      

        // function generateUniqueFilename(prefix) {
        //     const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
        //     return `${prefix}_${timestamp}.json`;
        // }

        // const filename = generateUniqueFilename('location_list');
        // fs.writeFile(`${filename}`, JSON.stringify(list, null, 2), (err) => {
        //     if (err) throw err;
        //     console.log('Data written to file');
        // });
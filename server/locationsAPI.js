// // API Key = fsq3Nq0mkZ3S3E6kiHea7RjQXE+XsDmAnkvZKzvsJOpGcQE=
// // Generates list of locations based on categories and search query
// // DO NOT USE IMPORT FOR COMMON JS MODULES
// const { get } = require('http');
// const data = require('./rankingtest.json');
// const fs = require('fs');
// const sdk = require('api')('@fsq-developer/v1.0#x6xjhzlic2gi70');


// data.sort((a, b) => {
//     return a.rank - b.rank;
// });

// // console.log(data);

// // const numDays = 5; // number of days

// // // Generates the number of locations that would be provided to the user based on the number of days and its rank
// // const rankRule = {
// //     1: (numDays * 8),
// //     2: (numDays * 7),
// //     3: (numDays * 6),
// //     4: (numDays * 5),
// //     5: (numDays * 4),
// //     6: (numDays * 3),
// //     // 7: (numDays * 2),
// //     // 8: (numDays * 1),
// //   };

//   const numDays = 1; // number of days

//   // Generates the number of locations that would be provided to the user based on the number of days and its rank
//   const rankRule = {
//       1: (numDays * 2),
//       2: (numDays * 2),
//       3: (numDays * 2),
//       4: (numDays * 2),
//       5: (numDays * 2),
//       6: (numDays * 2),
//       7: (numDays * 5),
      
//       // 7: (numDays * 2),
//       // 8: (numDays * 1),
//     };

//   // Obtain the list of locations based on the rank rule
//   // for example: the category that is ranked 1 will have 40 locations assuming duration of travel is 5 days (5 * 8)
//   async function obtainListOfLocations(data, rankRule) {
//     const destination_location = '1.3521,103.8198'; // Singapore '37.5519,126.9918'; // Korea
//     let locations = [];

//     for (let i = 0; i < data.length; i++) {
//         const category = data[i].category;
//         const category_id = data[i].category_id;
//         const numberOfResultsPerCategory = rankRule[data[i].rank];
//         const duration = data[i].activity_duration;

//         try {
//             const results = await getListPerCategory(category, category_id, duration, destination_location);

//             if (results && results.results && results.results.length > 0) {
//                 const limitedResults = results.results.slice(0, numberOfResultsPerCategory); // GOT ERROR HERE DK WHY RESULTS.RESULTS DOESNT WORK :(
//                 locations = locations.concat(limitedResults);
//             } else {
//                 console.log(`No results for category ${category}`); 
//             }
//         } catch (error) {
//             console.error(`Error retrieving results for category ${category}: ${error}`);
//         }
//     }

//     // console.log(locations);
//     return locations;
// }


// sdk.auth('fsq3Nq0mkZ3S3E6kiHea7RjQXE+XsDmAnkvZKzvsJOpGcQE=');
// async function getListPerCategory(cat, cat_id, duration, country) {
//     console.log(duration)
//     return sdk.placeSearch({
//         query: cat.toString(),  // keyword search
//         ll: country, // the lat/long for Singapore // ideally should be airbnb location
//         radius: 10000,  // search within a radius (in terms of m)
//         categories: cat_id.toString(),
//         fields: 'fsq_id%2Cname%2Cgeocodes%2Clocation%2Cchains%2Chours%2Crating%2Cpopularity%2Cprice%2Cphotos',
//         sort: 'RATING', // sort by rating
        
//     })
//     .then(({ data }) => {
//         if (data && Array.isArray(data.results)) {
//             // Append activity_duration to each item in results array
//             data.results.forEach(item => {
//                 item.activity_duration = duration;
//             });
//             // console.log(data)
//             return data
//         } else {
//             return []; // return an empty array if data doesn't have results or results is not an array
//         }
//     })
//     .catch(err => console.error(err));
// }

// // getListPerCategory('Night Clubs', '10032', 3, '1.3521,103.8198');
// // find lat long based on country

// getListPerCategory('Night Clubs', '10032', '1.3521,103.8198');
// obtainListOfLocations(data, rankRule)
//     .then(list => {
//         // console.log(list);

//         // function generateUniqueFilename(prefix) {
//         //     const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
//         //     return `${prefix}_${timestamp}.json`;
//         // }

//         // const filename = generateUniqueFilename('location_list');
//         // fs.writeFile(`${filename}`, JSON.stringify(list, null, 2), (err) => {
//         //     if (err) throw err;
//         //     console.log('Data written to file');
//         // });
//     })
//     .catch(error => {
//         console.error(`Error: ${error}`);
//     });

// <<<<<<< HEAD:server/locationsAPI.js
// // Categories and its Code
// // let categories = {
// //     ArtsEntertainment: {
// //         code: '10000',
// //         duration: 3,
// //      },
// //       // Arts & Entertainment
// //     NightClubs: {
// //         code: '10032',
// //         duration: 3,
// //     },
// //     Bar: {
// //         code: '13003',
// //         duration: 3,
// //     },
// //     Museum: {
// //         code: '10027', 
// //         duration: 2,
// //     },
// //     HistoricProtectedSites: {
// //         code: '16020', 
// //         duration: 3,
// //     },
// //     LandmarkOutdoors: {
// //         code: '16000', 
// //         duration: 3,
// //     },
// //     Parks: {
// //         code: '16032', 
// //         duration: 3,
// //     },
// //     EntertainmentEvents: {
// //         code: '14003', 
// //         duration: 3,
// //     }
// // };
// =======

// module.exports = {
//     processPreferences: async function(preferences) {
//         try {
//             const list = await obtainListOfLocations(preferences, rankRule);
//             // console.log(list);
//             return list;
//         } catch (error) {
//             console.error(`Error: ${error}`);
//         }
//     }  
// };
      

//                 // function generateUniqueFilename(prefix) {
//                 //     const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
//                 //     return `${prefix}_${timestamp}.json`;
//                 // }
        
//                 // const filename = generateUniqueFilename('location_list');
//                 // fs.writeFile(`${filename}`, JSON.stringify(list, null, 2), (err) => {
//                 //     if (err) throw err;
//                 //     console.log('Data written to file');
//                 // });
// >>>>>>> conflict-resolution:server/routes/locationsAPI.js

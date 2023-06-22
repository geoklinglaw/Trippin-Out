// import locationList from './tempLocations.json';

// CLOWNED PLS DONT USE THIS AT THE MOMENT

// PLACES 
const fs = require('fs');
const sdk = require('api')('@fsq-developer/v1.0#x6xjhzlic2gi70');

sdk.auth('fsq3Nq0mkZ3S3E6kiHea7RjQXE+XsDmAnkvZKzvsJOpGcQE=');
fs.readFile('tempLocations.json', 'utf8', (err, fileContents) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    const data = JSON.parse(fileContents);
    let detailsArray = [];
    let completedRequests = 0;

    data.results.forEach((item, index) => {
        const fsqId = item.fsq_id;

        sdk.placeDetails({fsq_id: fsqId})
            .then(({ data }) => {
                // Create a new object with the fields you need
                let customData = {
                    fsq_id: data.fsq_id,
                    name: data.name,
                    description: data.description,
                    hours: data.hours,
                    location: data.location,
                    geolocation: data.geocodes.main,
                    // outlets: data.chains, DOESNT WORK
                    // description: data.description,
                    // price: data.price,
                    // rating: data.rating,
                    // date_closed: data.date_closed,
                };

                // Add the custom object to the temporary array
                detailsArray.push(customData);

                // Increment the counter
                completedRequests++;

                // If this is the last item, write the details to a new JSON file
                if (completedRequests === Object.keys(data).length) {
                    fs.writeFile('details2.json', JSON.stringify(detailsArray, null, 2), (err) => {
                        if (err) throw err;
                        console.log('Details written to file');
                    });
                }
            })
            .catch(err => console.error('Error fetching details:', err));
    });
});



// AUTOCOMPLETE AND ADDRESS DETAILS API

// const fs = require('fs');
// const fetch = require('node-fetch');

// async function getAddressDetails() {
//     fs.readFile('tempLocations.json', 'utf8', async (err, fileContents) => {
//         if (err) {
//             console.error('Error reading the file:', err);
//             return;
//         }
//         const data = JSON.parse(fileContents);
//         let detailsArray = [];

//         for (let item of data.results) {
//             const namedQuery = item.name;

//             try {
//                 const response = await fetch(
//                     `https://api.foursquare.com/v3/address/555341570000072f2955-5220?${namedQuery}`, // Please confirm the correct URL
//                     {
//                         method: 'GET',
//                         headers: {
//                             Accept: 'application/json',
//                             Authorization: 'fsq3Nq0mkZ3S3E6kiHea7RjQXE+XsDmAnkvZKzvsJOpGcQE=', // Replace with your token or API key
//                         },
//                     }
//                 );
                
//                 const data = await response.json();
                
//                 // let customData = {
//                 //     fsq_id: data.fsq_id,
//                 //     name: data.name,
//                 //     description: data.description,
//                 //     hours: data.directory?.hours,
//                 //     location: data.location,
//                 //     geolocation: data.geocodes?.main,
//                 // };

//                 // Add the custom object to the temporary array
//                 detailsArray.push(data);
//             } catch (err) {
//                 console.error('Error fetching details:', err);
//             }
//         }
        
//         // Write the details to a new JSON file
//         fs.writeFile('details3.json', JSON.stringify(detailsArray, null, 2), (err) => {
//             if (err) throw err;
//             console.log('Details written to file');
//         });
//     });
// }

// // Call the function to start the process
// getAddressDetails();

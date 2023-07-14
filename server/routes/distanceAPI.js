// const {Client} = require("@googlemaps/google-maps-services-js");
// COMMENTED FOR UNIT TEST
// const locations = require('./locations.json'); 
const fs = require('fs');
var path = require('path');
var filePath = path.resolve('./timeMatrix')
const accoms = '1.3589691105622246, 103.95813708783058'


async function getDistanceMatrix(locations, food, accoms) {
    var axios = require('axios'); // first address must be airbnb
    const origins = [accoms].concat(locations.map(location => `${location.geocodes.main.latitude},${location.geocodes.main.longitude}`)).join('|');
    const destinations = [accoms].concat(locations.map(location => `${location.geocodes.main.latitude},${location.geocodes.main.longitude}`)).join('|');    

    // const origins = locations.map(location => `${location.location.lat},${location.location.lng}`).join('|');
    // const destinations = locations.map(location => `${location.location.lat},${location.location.lng}`).join('|');

    // request based on bus 
    
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origins}&destinations=${destinations}&mode=transit&transit_mode=bus&transit_routing_preference=less_walking&traffic_model=optimistic&avoid=tolls&units=imperial&key=AIzaSyBcWBdZDoCbrwwzekb964YE65Y-Yp3i044`,
        headers: { }
    };

    return axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));

        function generateUniqueFilename(prefix) {
            const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
            return `${prefix}_${timestamp}.json`;
        }
        const filename = generateUniqueFilename('distance_matrix_results1');

        fs.writeFile(`${filename}`, JSON.stringify(response.data, null, 2), (err) => {
        });

        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    });
}

module.exports = { getDistanceMatrix };

// const client = new Client({});

// async function getDistanceMatrix() {
    // const origins = locations.map(location => `${location.location.lat},${location.location.lng}`);
    // const destinations = [...origins]; // same as origins in your case

//     try {
//         const response = await client.distancematrix({
//             params: {
//                 origins: origins,
//                 destinations: destinations,
//                 key: 'AIzaSyBcWBdZDoCbrwwzekb964YE65Y-Yp3i044',
//             },
//             timeout: 1000, // milliseconds
//         });

//         if (response.data.status === 'OK') {
//             // console.log(`Response: ${response.data.rows}`)
//             return response.data.rows;
//         } else {
//             console.log(`Error: ${response.data.error_message}`);
//             return null;
//         }
//     } catch (error) {
//         console.error(`An error occurred: ${error}`);
//         return null;
//     }
// }

// getDistanceMatrix().then(distanceMatrix => {
//     console.log(JSON.stringify(distanceMatrix, null, 2));
// });

// module.exports = { getDistanceMatrix };


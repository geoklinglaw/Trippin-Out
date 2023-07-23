// const {Client} = require("@googlemaps/google-maps-services-js");
// COMMENTED FOR UNIT TEST
// const locations = require('./locations.json'); 
const fs = require('fs');
var path = require('path');
var filePath = path.resolve('./timeMatrix')
// const accoms = '1.3589691105622246, 103.95813708783058'


async function getDistanceMatrix(accoms, locations) {
    var axios = require('axios'); // first address must be airbnb
    
    locations = JSON.parse(locations);
    console.log("accoms ", accoms)
    console.log("LOCATIONS", locations)

    const accomCoordinates = accoms.map(accom => accom.latLong);
    const origins = accomCoordinates.concat(locations.map(location => `${location.latitude},${location.longitude}`)).join('|');
    const destinations = accomCoordinates.concat(locations.map(location => `${location.latitude},${location.longitude}`)).join('|');    

    console.log("origins", origins)
    console.log("destinations", destinations)
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

        // function generateUniqueFilename(prefix) {
        //     const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
        //     return `${prefix}_${timestamp}.json`;
        // }
        // const filename = generateUniqueFilename('distance_matrix_results1');

        // fs.writeFile(`${filename}`, JSON.stringify(response.data, null, 2), (err) => {
        // });

        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    });
}

module.exports = {
    getDistanceMatrix: async function(accoms, locations) {
        try {
            const list = await getDistanceMatrix(accoms, locations);
            console.log(list);
            return list;
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }  
};
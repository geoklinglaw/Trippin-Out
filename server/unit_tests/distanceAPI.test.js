const { getDistanceMatrix } = require("../routes/distanceAPI");

test("getDistanceMatrix retrieves the correct distance matrix for Korea Locations", async () => {
  const accoms = "1.2841401999747222,103.86086997077395";
  const locations = require("../location_list_20230627T205236778Z.json");

  const result = await getDistanceMatrix(accoms, locations);
  expect(result).not.toBeNull();
});


test("getDistanceMatrix retrieves the correct distance matrix for Korea Food", async () => {
    const accoms = "1.2841401999747222,103.86086997077395";
    const locations = require("../food_options_20230715T140054250Z.json");
  
    const result = await getDistanceMatrix(accoms, locations);
    expect(result).not.toBeNull();
  });

// food_options_20230714T154652802Z.json

test("getDistanceMatrix retrieves the correct distance matrix for Singapore Food", async () => {
    const accoms = "1.2841401999747222,103.86086997077395";
    const locations = require("../food_options_20230714T154652802Z.json");
  
    const result = await getDistanceMatrix(accoms, locations);
    expect(result).not.toBeNull();
  });


// Trippin-Out/server/LOC_LIST.json

test("getDistanceMatrix retrieves the correct distance matrix for Singapore Locations", async () => {
    const accoms = "1.2841401999747222,103.86086997077395";
    const locations = require("../LOC_LIST.json");
  
    const result = await getDistanceMatrix(accoms, locations);
    expect(result).not.toBeNull();
  });
  

// location_list_20230627T205236778Z.json

test("getDistanceMatrix retrieves the correct distance matrix for Japan Locations", async () => {
    const accoms = "1.2841401999747222,103.86086997077395";
    const locations = require("../location_list_20230627T205236778Z.json");
  
    const result = await getDistanceMatrix(accoms, locations);
    expect(result).not.toBeNull();
  });

  // 

  test("getDistanceMatrix retrieves the correct distance matrix for Japan Food", async () => {
    const accoms = "1.2841401999747222,103.86086997077395";
    const locations = require("../food_options_20230714T154652802Z.json");
  
    const result = await getDistanceMatrix(accoms, locations);
    expect(result).not.toBeNull();
  });

// location_list_20230627T205236778Z.json

test("getDistanceMatrix retrieves the correct distance matrix for Thailand Food", async () => {
    const accoms = "1.2841401999747222,103.86086997077395";
    const locations = require("../food_options_20230714T154652802Z.json");
  
    const result = await getDistanceMatrix(accoms, locations);
    expect(result).not.toBeNull();
  });

// rankingtest.json

test("getDistanceMatrix retrieves the correct distance matrix for Thailand Locations", async () => {
    const accoms = "1.2841401999747222,103.86086997077395";
    const locations = require("../rankingtest.json");
  
    const result = await getDistanceMatrix(accoms, locations);
    expect(result).not.toBeNull();
  });

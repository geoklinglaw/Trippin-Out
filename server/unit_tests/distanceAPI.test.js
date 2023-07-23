const { getDistanceMatrix } = require("../routes/distanceAPI");

test("getDistanceMatrix retrieves the correct distance matrix", async () => {
  const accoms = "1.2841401999747222,103.86086997077395";
  const locations = require("../location_list_20230627T205236778Z.json");

  const result = await getDistanceMatrix(accoms, locations);
  expect(result).not.toBeNull();
});

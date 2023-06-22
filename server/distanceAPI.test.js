const { getDistanceMatrix } = require('./distanceAPI');

// Define your test
test('getDistanceMatrix retrieves the correct distance matrix', async () => {
    const result = await getDistanceMatrix();
    expect(result).not.toBeNull();
});

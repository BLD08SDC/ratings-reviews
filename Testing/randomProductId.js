  
const faker = require('faker');

function randomProductId() {
    const product_id = faker.random.number({ min: 1, max: 10000});
    return product_id;
}

module.exports = {
    randomProductId,
};
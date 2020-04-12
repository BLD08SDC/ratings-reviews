// install faker OR add faker to package.json "dependencies"
// THEN
// add this line to use faker in this file
const faker = require('faker');

// add this line to use fs / fs.appedFile / fs.appendFileSync
const fs = require('fs');

// declare an index
let productPK = 1;
let reviewsPK = 1;
let characteristicsPK = 1;
let characteristics_reviewsPK = 1;
let reviews_photosPK = 1;

// declare a function to mimic SERIAL / BIGSERIAL / INDEX / ID
let productPKIncrement = () => (productPK += 1);
let characteristicsPKIncrement = () => (characteristicsPK += 1);
let characteristics_reviewsPKIncrement = () => (characteristics_reviewsPK += 1);
let reviewsPKIncrement = () => (reviewsPK += 1);
let reviews_photosPKIncrement = () => (reviews_photosPK += 1);

// record start time
const start = Date.now();

for (let i = 1; i < 3; i += 1) {
    // Generate a row in the product table
    fs.appendFileSync('../csvFiles/generated-product.csv', `${productPK},"${faker.commerce.productName()}","${faker.lorem.sentence()}","${faker.lorem.paragraph()}","${faker.commerce.department()}",${faker.random.number({ min: 1, max: 999 })}\n`);

    // Generate a row in the reviews table
    for (let j = 1; j < faker.random.number({ min: 1, max: 15}); j += 1) {
        // Generate a row in the reviews table
        fs.appendFileSync('../csvFiles/generated-reviews.csv', `${reviewsPK},${productPK},${faker.random.number({ min: 1, max: 5 })},${faker.date.between('2015-12-23', '2020-04-20')},"${faker.lorem.sentence()}","${faker.lorem.paragraph()}",${faker.random.boolean()},${faker.random.boolean()},${faker.name.findName()},${faker.internet.email()},${faker.lorem.sentence()},${faker.random.number({ min: 0, max: 7 })},\n`);

        // Generate a Size row in the characteristics table
        fs.appendFileSync('../csvFiles/generated-characteristics.csv', `${characteristicsPK},${productPK},"Size"\n`);
        // Generate a size value row in the characteristics_reviews table
        fs.appendFileSync('../csvFiles/generated-characteristics_reviews.csv', `${characteristics_reviewsPK},${characteristicsPK},${reviewsPK},${faker.random.number({ min: 1, max: 5 })}\n`);
        characteristicsPKIncrement();
        characteristics_reviewsPKIncrement();

        // Generate a Width row in the characteristics table
        fs.appendFileSync('../csvFiles/generated-characteristics.csv', `${characteristicsPK},${productPK},"Width"\n`);
        // Generate a width value row in the characteristics_reviews table
        fs.appendFileSync('../csvFiles/generated-characteristics_reviews.csv', `${characteristics_reviewsPK},${characteristicsPK},${reviewsPK},${faker.random.number({ min: 1, max: 5 })}\n`);
        characteristicsPKIncrement();
        characteristics_reviewsPKIncrement();

        // Generate a Comfort row in the characteristics table
        fs.appendFileSync('../csvFiles/generated-characteristics.csv', `${characteristicsPK},${productPK},"Comfort"\n`);
        // Generate a comfort value row in the characteristics_reviews table
        fs.appendFileSync('../csvFiles/generated-characteristics_reviews.csv', `${characteristics_reviewsPK},${characteristicsPK},${reviewsPK},${faker.random.number({ min: 1, max: 5 })}\n`);
        characteristicsPKIncrement();
        characteristics_reviewsPKIncrement();

        // Generate a Quality row in the characteristics table
        fs.appendFileSync('../csvFiles/generated-characteristics.csv', `${characteristicsPK},${productPK},"Quality"\n`);
        // Generate a quality value row in the characteristics_reviews table
        fs.appendFileSync('../csvFiles/generated-characteristics_reviews.csv', `${characteristics_reviewsPK},${characteristicsPK},${reviewsPK},${faker.random.number({ min: 1, max: 5 })}\n`);
        characteristicsPKIncrement();
        characteristics_reviewsPKIncrement();

        // Generate a Length row in the characteristics table
        fs.appendFileSync('../csvFiles/generated-characteristics.csv', `${characteristicsPK},${productPK},"Length"\n`);
        // Generate a length value row in the characteristics_reviews table
        fs.appendFileSync('../csvFiles/generated-characteristics_reviews.csv', `${characteristics_reviewsPK},${characteristicsPK},${reviewsPK},${faker.random.number({ min: 1, max: 5 })}\n`);
        characteristicsPKIncrement();
        characteristics_reviewsPKIncrement();

        // Generate a Fit row in the characteristics table
        fs.appendFileSync('../csvFiles/generated-characteristics.csv', `${characteristicsPK},${productPK},"Fit"\n`);
        // Generate a fit value row in the characteristics_reviews table
        fs.appendFileSync('../csvFiles/generated-characteristics_reviews.csv', `${characteristics_reviewsPK},${characteristicsPK},${reviewsPK},${faker.random.number({ min: 1, max: 5 })}\n`);
        characteristicsPKIncrement();
        characteristics_reviewsPKIncrement();
        
        // Generate between 0 and 4 rows row in the reviews_photos table
        for (let k = 0; k < faker.random.number({ min: 0, max: 4}); k += 1) {
            // Generate a row in the reviews_photos table
            fs.appendFileSync('../csvFiles/generated-reviews_photos.csv', `${reviews_photosPK},${reviewsPK},"${faker.image.avatar()}"\n`);
            reviews_photosPKIncrement();
        }

        reviewsPKIncrement();
    }
    productPKIncrement();
};

// console log end time
const timeInMilliSeconds = Date.now() - start;
console.log(`seconds elapsed = ${Math.floor(timeInMilliSeconds/1000)}`)
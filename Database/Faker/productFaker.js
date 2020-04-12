// install faker OR add faker to package.json "dependencies"
// THEN
// add this line to use faker in this file
const faker = require('faker');

// add this line to use fs / fs.appedFile / fs.appendFileSync
const fs = require('fs');

// declare an index
let index = 1;

// declare a function to mimic SERIAL / BIGSERIAL / INDEX / ID
let increment = () => (index += 1);

// record start time
const start = Date.now();

for (let i = 1; i < 10000001; i += 1) {
    let randomName = faker.commerce.productName();
    let randomSlogan = faker.lorem.sentence();
    let randomDescription = faker.lorem.paragraph();
    let randomCategory = faker.commerce.department();
    let randomDefault_price = faker.random.number({ min: 1, max: 999 });

    fs.appendFileSync('../csv-files/generated-product.csv', `${index},"${randomName}","${randomSlogan}","${randomDescription}","${randomCategory}",${randomDefault_price}\n`);
    
    increment();
};

// console log end time
const timeInMilliSeconds = Date.now() - start;
console.log(`seconds elapsed = ${Math.floor(timeInMilliSeconds/1000)}`)
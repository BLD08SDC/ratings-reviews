const faker = require('faker');
const fs = require('fs');

let index = 1;
let increment = () => (index += 1);

for (let i = 1; i < 10000001; i += 1) {
    let randomNumber = faker.random.number({ min: 1, max: 5 })

    fs.appendFileSync('csv-files/generated-characteristics_reviews.csv', `${index},${index},${index},${randomNumber}\n`);
    increment();

    randomNumber = faker.random.number({ min: 1, max: 5 })
    fs.appendFileSync('csv-files/generated-characteristics_reviews.csv', `${index},${index},${index},${randomNumber}\n`);
    increment();

    randomNumber = faker.random.number({ min: 1, max: 5 })
    fs.appendFileSync('csv-files/generated-characteristics_reviews.csv', `${index},${index},${index},${randomNumber}\n`);
    increment();

    randomNumber = faker.random.number({ min: 1, max: 5 })
    fs.appendFileSync('csv-files/generated-characteristics_reviews.csv', `${index},${index},${index},${randomNumber}\n`);
    increment();

    fkIncrement();
}
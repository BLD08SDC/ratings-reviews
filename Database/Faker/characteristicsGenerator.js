// Import Faker.js
const faker = require('faker');

// Import Node.js fileSystem
const fs = require('fs');

// Import yargs.js to interact with file and set variables from the command line
const argv = require('yargs').argv;

// Declare lines as a yargs value with a backup default value
const lines = argv.lines || 10000000;

// Declare filename as a yargs value with a backup default value
const filename = argv.filename || '/Users/thomas/git-hackreactor/systemDesignCapstone/full/ratings-reviews/Database/csvFiles/generated-characteristics.csv';

// Declare writeStream as a function which uses the filename variable 
//   and tells fs to open a writable stream
const writeStream =fs.createWriteStream(filename)

// Declare a function that generates on row / entry of fake data for the table
const createCharacteristicsEntry = () => (`${characteristicsPK},${productPK},"Size"\n`);

// https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
const startGenerator = (writeStream, encoding, done) => {
    // Set the lines iterator so that you know how many rows / entries to add to the table
    let i = lines;
    
    function generate() {
        // Set a drain boolean
        let drainBool = true;
        // Use a do{}while()
        do {
            // Decrement the lines iterator
            i--;
            // Generate an entry to write to the table
            let entry = createCharacteristicsEntry();
            if (i === 0) {
                // This is the end of the loop, so close the stream with the done callback
                writeStream.write(entry, encoding, done)
            } else {
                // The loop is not ending, so just write an entry
                writeStream.write(entry, encoding)
            }
        } while ( i > 0 && drainBool);
        // If the data writing stream is backed up, we need to wait for it to drain, and then start writing again
        if (i > 0 && !drainBool) {
            writeStream.once('drain', write);
        }
    };
    // Invoke generate
    generate();
};
// Invoke the generator with args to start creating fake data
startGenerator(writeStream, 'utf-8', () => {
    writeStream.end();
});

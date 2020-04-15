// This file should be clean, containing only the server and API routes as pure functions

// This imports the dotenv dependency (for setting server port and other secret values)
require('dotenv').config();

// This imports new relic, a dependency that helps with testing
require('newrelic'); 

// import Express
const express = require('express');

// import your pool
const queryPool = require('./queries');

const app = express();

// This sets a port variable equal to the dotenv PORT value
const port = process.env.PORT;

// These app.use statements tell Express which middleware 'layers' to apply
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// This is the API route for getting a list of reviews (currently returns duplicates if review has more than one photo attached to it)
app.get('/reviews/:product_id/list', (req, res) => {
    queryPool.getListOfReviews(req.params)
      .then(data => res.send(data))
      .catch(() => res.sendStatus(400))
})

// This is the API route for getting the characteristics meta data (incomplete / currently returns nothing)
app.get('reviews/:product_id/meta', (req, res) => {
    queryPool.getCharacteristicsMeta(req.params)
      .then(data => res.send(data))
      .catch(() => res.sendStatus(400))
})

// This is the API route for adding a new review (does not currently handle adding a photo)
app.post('/reviews/:product_id', (req, res) => {
    queryPool.addReview(req.params)
      .then(res.send("Thank\'s for your review!"))
      .catch(() => res.sendStatus(400))
})

// This is the API route for marking a review as helpful
app.put('/reviews/helpful/:review_id', (req, res) => {
    queryPool.markHelpful(req.params)
      .then(res.send('Thank\'s for the feedback'))
      .catch(() => res.sendStatus(400))
})

// This is the API route for reporting and review
app.put('/reviews/report/:review_id', (req, res) => {
    queryPool.reportReview(req.params)
      .then(res.send('Review Reported'))
      .catch(() => res.sendStatus(400))
})

// Express needs to know what port to listen on, a console.log callback serves as a confirmation that the server is properly functioning and running
app.listen(port, () => {
    console.log(`the server is running on port ${port}`)
});

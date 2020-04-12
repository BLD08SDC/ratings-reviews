require('newrelic'); 
require('dotenv').config();

// import Express
const express = require('express');

// import your pool
const queryPool = require('./queries');

const app = express();

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
            .then(data => {
                const results = data.rows.map(i => ({
                    "review_id": i.id,
                    "rating": i.rating,
                    "summary": i.summary,
                    "recommend": i.recommend,
                    "response": i.response,
                    "body": i.body,
                    "date": i.date,
                    "reviewer_name": i.reviewer_name,
                    "helpfulness": i.helpfulness,
                    "photos": [i.url],
                }));
                
                return res.send(
                    {
                        "product": req.params.product_id,
                        "page": 0,
                        "count": 5,
                        "results": results,
                    }
            )})
            .catch(error => console.log(error))
})

// This is the API route for getting the characteristics meta data (incomplete / currently returns nothing)
app.get('reviews/:product_id/meta', (req, res) => {
    queryPool.getCharacteristicsMeta(req.params)
        .then(res.send(
            {

            }
        ))
        .catch(error => console.log(error))
})

// This is the API route for adding a new review (does not currently handle adding a photo)
app.post('/reviews/:product_id', (req, res) => {
    queryPool.addReview(req.params)
        .then(res.send("Thank\'s for your review!"))
        .catch(error => console.log(error))
})

// This is the API route for marking a review as helpful
app.put('/reviews/helpful/:review_id', (req, res) => {
    queryPool.markHelpful(req.params)
        .then(res.send('Thank\'s for the feedback'))
        .catch(error => console.log(error))
})

// This is the API route for reporting and review
app.put('/reviews/report/:review_id', (req, res) => {
    queryPool.reportReview(req.params)
        .then(res.send('Review Reported'))
        .catch(error => console.log(error))
})

// Express need to know what port to listen on, a console.log callback serves as a confirmation that the server is properly functioning and running
app.listen(port, () => {
    console.log(`the server is running on port ${port}`)
});

const { Pool } = require('pg');
const pool = new Pool(/* config */{
  user: 'thomas',
  host: 'localhost',
  database: 'ratingsreviewsbe',
  port: 5432,
});

const getListOfReviews = (req) => {
  const product_id = parseInt(req.product_id);
  const page = parseInt(req.page) || 0;
  const count = parseInt(req.count) * 5 || 25;
  const sort = req.sort || 'date';
  // figure out the page / count logic
  
  return pool
    .query(`
      SELECT reviews.id AS review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, reviews_photos.id AS photo_id, url
      FROM reviews LEFT OUTER JOIN reviews_photos ON reviews.id = reviews_photos.review_id 
      WHERE reviews.product_id=$1
      `, [product_id])
    .then((data) => {
      let photoArr = []
      const results = data.rows.map(i => {
        const review = ({
        "review_id": i.review_id,
        "rating": i.rating,
        "summary": i.summary,
        "recommend": i.recommend,
        "response": i.response,
        "body": i.body,
        "date": i.date,
        "reviewer_name": i.reviewer_name,
        "helpfulness": i.helpfulness,
        "photos": [],
        });
        if (i.photo_id !== null) {
            index = i.review_id
            photoArr.push({"photo_id": i.photo_id, "url": i.url});
        }
        return review;
      });

      const uniqueResults = Array.from(new Set(results.map(r => r.review_id))).map(review_id => (results.find(a => a.review_id === review_id)))
      
      photoArr.map(i => {
        let reviewToAddPhotoTo = results.find(a => a.review_id === i.review_id);
        reviewToAddPhotoTo.photos.push({"id": i.photo_id, "url": i.url})
      })

      // limit to 5
      // sort 
      // in that order or vice versa - test both to see which is faster

      return ({
        "product": `${product_id}`,
        "page": page,
        "count": count,
        "results": uniqueResults
      })
    })
    .catch(error => console.log(error))
}

const getCharacteristicsMeta = (req, res) => {
    pool
      .query()
      .then(res.send())
      .catch(error => console.log(error))
}

const addReview = (req) => {
  const product_id = parseInt(req.product_id);
  const rating = req.rating || 3;
  const date = req.date || "2019-10-22T00:00:00.000Z";
  const summary = req.summary || "testing123summary";
  const body = req.body || "testing123345654body";
  const recommend = req.recommend || true;
  const reported = false;
  const reviewer_name = req.reviewer_name || "testName";
  const reviewer_email = req.reviewer_email || null;
  const response = req.response || null;
  const helpfulness = req.helpfulness || 0;
  let id = null;

  return pool
    .query(`SELECT MAX(id) FROM reviews`)
      .then((data) => {
        // console.log(data.rows[0].max)
        id = data.rows[0].max + 1;
        return pool.query(
          `INSERT INTO
            reviews (
              id,
              product_id, 
              rating, 
              date, 
              summary, 
              body, 
              recommend, 
              reported, 
              reviewer_name, 
              reviewer_email, 
              response, 
              helpfulness)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, 
          [
            id,
            product_id,
            rating,
            date,
            summary,
            body,
            recommend,
            reported,
            reviewer_name,
            reviewer_email,
            response,
            helpfulness,
          ]
        )
      })
        .catch(error => console.log(error))
}

const markHelpful = (req, res) => {
    const id = parseInt(req.review_id);

    return pool
      .query(`UPDATE reviews SET helpfulness=helpfulness+1 WHERE id=$1`, [id])
        .catch(error => console.log(error))
}

const reportReview = (req, res) => {
    const id = parseInt(req.review_id);

    return pool
      .query(`UPDATE reviews SET reported='t' WHERE id=$1`, [id])
        .catch(error => console.log(error))
}

module.exports = {
    getListOfReviews,
    getCharacteristicsMeta,
    addReview,
    markHelpful,
    reportReview,
}

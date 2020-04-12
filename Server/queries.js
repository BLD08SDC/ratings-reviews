const { Pool } = require('pg');
const pool = new Pool(/* config */{
  user: 'thomas',
  host: 'localhost',
  database: 'ratingsreviewsbe',
  port: 5432,
});

const getListOfReviews = (req) => {
    // console.log(req)
    const product_id = parseInt(req.product_id);
    const page = parseInt(req.page) || 0;
    const count = parseInt(req.count) || 5;
    const sort = req.sort || 'date';
    // const offsetBy = page * count || 0;

    return pool
      .query(`SELECT * FROM reviews FULL JOIN reviews_photos ON reviews.id = reviews_photos.review_id WHERE reviews.product_id=$1 AND NOT reviews.reported ORDER BY $3 DESC LIMIT $2`, [product_id, count, sort]) 
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
}

const markHelpful = (req, res) => {
    const id = parseInt(req.review_id);

    return pool
      .query(`UPDATE reviews SET helpfulness=helpfulness+1 WHERE id=$1`, [id])
}

const reportReview = (req, res) => {
    const id = parseInt(req.review_id);

    return pool
      .query(`UPDATE reviews SET reported='t' WHERE id=$1`, [id])
}

module.exports = {
    getListOfReviews,
    getCharacteristicsMeta,
    addReview,
    markHelpful,
    reportReview,
}

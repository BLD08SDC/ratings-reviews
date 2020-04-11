-- \i '/Users/thomas/git-hackreactor/systemDesignCapstone/ratings-reviews-be/posgreSQLdbScript1.sql'
\c thomas

DROP DATABASE IF EXISTS ratingsreviewsbe;

CREATE DATABASE ratingsreviewsbe;

\c ratingsreviewsbe;

CREATE TABLE product (
  id SERIAL,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE characteristics (
  id SERIAL,
  product_id INTEGER NOT NULL REFERENCES product(id),
  name VARCHAR,
  PRIMARY KEY (id)
);


CREATE TABLE characteristics_reviews (
  id SERIAL,
  characteristic_id INTEGER NOT NULL REFERENCES characteristics(id),
  review_id INTEGER NOT NULL,
  value VARCHAR,
  PRIMARY KEY (id)
);


CREATE TABLE reviews (
  id SERIAL,
  product_id INTEGER NOT NULL REFERENCES product(id),
  rating INTEGER,
  date DATE,
  summary VARCHAR,
  body VARCHAR,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR,
  helpfulness INTEGER,
  PRIMARY KEY (id)
);


CREATE TABLE reviews_photos (
  id SERIAL,
  review_id INTEGER NOT NULL REFERENCES reviews(id),
  url VARCHAR,
  PRIMARY KEY (id)
);


COPY product (id, name, slogan, description, category, default_price) FROM '/Users/thomas/git-hackreactor/systemDesignCapstone/ratings-reviews-be/csv-files/generated-product.csv' DELIMITER ',' CSV;

COPY characteristics (id, product_id, name) FROM '/Users/thomas/git-hackreactor/systemDesignCapstone/ratings-reviews-be/rawDataCSV/characteristics.csv' DELIMITER ',' CSV HEADER;

COPY characteristics_reviews (id, characteristic_id, review_id, value) FROM '/Users/thomas/git-hackreactor/systemDesignCapstone/ratings-reviews-be/rawDataCSV/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

COPY reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/thomas/git-hackreactor/systemDesignCapstone/ratings-reviews-be/rawDataCSV/reviews.csv' DELIMITER ',' CSV HEADER;

COPY reviews_photos (id, review_id, url) FROM '/Users/thomas/git-hackreactor/systemDesignCapstone/ratings-reviews-be/rawDataCSV/reviews_photos.csv' DELIMITER ',' CSV HEADER;
DROP TABLE IF EXISTS inventory CASCADE;

CREATE TABLE inventory(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC NOT NULL
);

INSERT INTO inventory(name, description, quantity, unit_price)
  VALUES (
    'Banana', 
    'Yellow Fruit', 
    25, 
    0.59
  ),
  (
    'Apple', 
    'Red Fruit', 
    35, 
    0.33
  ),
  (
    'Lettuce', 
    'Green Vegetable', 
    50, 
    0.48
  ),
  (
    'Tomato', 
    'Red Vegetable', 
    84, 
    0.88
  );

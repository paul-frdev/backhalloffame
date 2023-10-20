CREATE TABLE users
(
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE roles
(
  role_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_name VARCHAR(50) UNIQUE NOT NULL,
  permissions JSONB
);

CREATE TABLE blog_categories
(
  category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL
);

CREATE TABLE articles
(
  article_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  description TEXT,
  images JSONB,
  category_id UUID REFERENCES blog_categories(category_id),
  created_at TIMESTAMP DEFAULT now()
);

INSERT INTO roles
  (role_name, permissions)
VALUES
  ('admin', '{"read": true, "write": true}');

INSERT INTO roles
  (role_name, permissions)
VALUES
  ('manager', '{"read": true, "write": false}');

UPDATE users
SET role_id = '2f95056d-a95b-470b-bfd0-e7297b7fe517'
WHERE user_id = '3aa3bcc6-b076-4a83-a049-18e8c535522b';


INSERT INTO articles
  (title, description, category_id, images)
VALUES
  (
    'dd',
    'sdsfsdsdsd',
    '85b28001-7b9e-462e-a582-9ab7ee8f245d',
    '[{"public_id": "public_id_1", "url": "url_1"}, {"public_id": "public_id_2", "url": "url_2"}]'
);


SELECT a.title, a.description, a.images, c.title
FROM articles AS a JOIN blog_categories AS c On a.category_id = c.category_id;

SELECT a.title, a.description, a.images, c.title
FROM articles AS a JOIN blog_categories AS c ON a.category_id = c.category_id
WHERE a.article_id = '';

CREATE TABLE products
(
  product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discount DECIMAL(4, 2),
  isDiscount BOOLEAN NOT NULL,
  category VARCHAR(255) NOT NULL,
  previewImage VARCHAR(255) NOT NULL,
  images JSONB NOT NULL,
  color_id INT,
  size_id INT,
  weight_id INT,
  FOREIGN KEY (color_id) REFERENCES colors(colors_id),
  FOREIGN KEY (size_id) REFERENCES sizes(sizes_id),
  FOREIGN KEY (weight_id) REFERENCES weights(weights_id)
);

CREATE TABLE weights
(
  weights_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  weight_name VARCHAR(255) NOT NULL
);

CREATE TABLE sizes
(
  sizes_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  size_name VARCHAR(255) NOT NULL
);

CREATE TABLE colors
(
  colors_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  color_name VARCHAR(255) NOT NULL
);

CREATE TABLE brands
(
  brand_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_name VARCHAR(255) NOT NULL
);

CREATE TABLE product_categories
(
  category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_name VARCHAR(255) NOT NULL
);


CREATE TABLE products
(
  product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity DECIMAL(4, 2) NOT NULL,
  isDiscount BOOLEAN NOT NULL,
  discount DECIMAL(4, 2),
  images JSONB NOT NULL,
  tags VARCHAR(255) NOT NULL,
  -- colors text[],
  -- sizes text[],
  -- weights text[],
  -- brands text[]
);


-- SELECT 
--   p.product_id,
--   p.title as product_title,
--   (
--     SELECT array_agg(s.size_name)
--     FROM sizes s
--     WHERE s.sizes_id = ANY(p.sizes)
--   ) as sizes,
-- FROM products p;


-- CREATE TABLE events (
--     event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     title VARCHAR(255) NOT NULL,
--     descriptionText TEXT,
--     event_date DATE,
--     event_timeslots TEXT[], 
--     images JSONB,
--     location VARCHAR(255),
--     adult_price DECIMAL(10, 2),
--     child_price DECIMAL(10, 2),
--     adult_quantity_tickets INT,
--     children_quantity_tickets INT
-- );

CREATE TABLE event_timeslots
(
  timeslot_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL,
  timeslot VARCHAR(5) NOT NULL,
  is_available BOOLEAN DEFAULT true,
  FOREIGN KEY (event_id) REFERENCES events (event_id)
);

INSERT INTO event_timeslots
  (event_id, timeslot)
VALUES
  ('581c0001-f4b1-434a-a1d8-51fe46d6709c', '10:00'),
  ('581c0001-f4b1-434a-a1d8-51fe46d6709c', '14:00');


-- CREATE OR REPLACE FUNCTION insert_event_timeslots
-- ()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   INSERT INTO event_timeslots
--     (event_id, timeslot)
--   SELECT NEW.event_id, unnest(NEW.event_timeslots);
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER add_event_timeslots
-- AFTER
-- INSERT ON
-- events
-- FOR
-- EACH
-- ROW
-- EXECUTE FUNCTION insert_event_timeslots
-- ();

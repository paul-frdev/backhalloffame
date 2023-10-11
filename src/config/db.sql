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
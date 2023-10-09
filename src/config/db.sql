CREATE TABLE users
(
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE roles (
    role_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_name VARCHAR(50) UNIQUE NOT NULL,
    permissions JSONB
);

CREATE TABLE blog_categories
(
  category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL
);

INSERT INTO roles (role_name, permissions)
VALUES ('admin', '{"read": true, "write": true}');

INSERT INTO roles (role_name, permissions)
VALUES ('manager', '{"read": true, "write": false}');

UPDATE users
SET role_id = '2f95056d-a95b-470b-bfd0-e7297b7fe517'
WHERE user_id = '3aa3bcc6-b076-4a83-a049-18e8c535522b';
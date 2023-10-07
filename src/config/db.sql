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

INSERT INTO roles (role_name, permissions)
VALUES ('admin', '{"read": true, "write": true}');

INSERT INTO roles (role_name, permissions)
VALUES ('manager', '{"read": true, "write": false}');

UPDATE users
SET role_id = 'e76768be-55a3-46fe-97c9-ca41c00a3af0'
WHERE user_id = '3e8ead3f-97d9-4223-9dd6-706c4d9824ca';
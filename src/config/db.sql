CREATE TABLE users (user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                     first_name VARCHAR(255) NOT NULL,
                                                                             email VARCHAR(255) NOT NULL,
                                                                                                mobile VARCHAR(255) NOT NULL,
                                                                                                                    user_password VARCHAR(255) NOT NULL);


CREATE TABLE roles (role_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                     role_name VARCHAR(50) UNIQUE NOT NULL,
                                                                                  permissions JSONB);


CREATE TABLE blog_categories (category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                                   title VARCHAR(255) NOT NULL);


CREATE TABLE articles (article_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                           title VARCHAR(255),
                                                                 description TEXT, images JSONB,
                                                                                   category_id UUID REFERENCES blog_categories(category_id),
                                                                                                               created_at TIMESTAMP DEFAULT now());


INSERT INTO roles (role_name,
                   permissions)
VALUES ('admin',
        '{"read": true, "write": true}');


INSERT INTO roles (role_name,
                   permissions)
VALUES ('manager',
        '{"read": true, "write": false}');


UPDATE users
SET role_id = '2f95056d-a95b-470b-bfd0-e7297b7fe517'
WHERE user_id = '3aa3bcc6-b076-4a83-a049-18e8c535522b';


INSERT INTO articles (title, description, category_id, images)
VALUES ('dd',
        'sdsfsdsdsd',
        '85b28001-7b9e-462e-a582-9ab7ee8f245d',
        '[{"public_id": "public_id_1", "url": "url_1"}, {"public_id": "public_id_2", "url": "url_2"}]');

-- ALTER TABLE articles
-- ADD COLUMN article_type VARCHAR(20) CHECK (article_type IN ('media_news', 'blog_news'));

SELECT a.title,
       a.description,
       a.images,
       c.title
FROM articles AS a
JOIN blog_categories AS c On a.category_id = c.category_id;


SELECT a.title,
       a.description,
       a.images,
       c.title
FROM articles AS a
JOIN blog_categories AS c ON a.category_id = c.category_id
WHERE a.article_id = '';


CREATE TABLE products (product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                           title VARCHAR(255) NOT NULL,
                                                                              description_text TEXT NOT NULL,
                                                                                                    price DECIMAL(10, 2) NOT NULL,
                                                                                                                         quantity DECIMAL(10, 2) NOT NULL,
                                                                                                                                                 discount DECIMAL(4, 2),
                                                                                                                                                          isDiscount BOOLEAN NOT NULL,
                                                                                                                                                                             images JSONB NOT NULL,
                                                                                                                                                                                          category_id UUID NOT NULL,
                       FOREIGN KEY (category_id) REFERENCES product_categories(category_id));


CREATE TABLE colors (color_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                       color_name VARCHAR(100) NOT NULL);


CREATE TABLE product_colors (product_id UUID NOT NULL,
                                             color_id UUID NOT NULL,
                             FOREIGN KEY (product_id) REFERENCES products(product_id),
                             FOREIGN KEY (color_id) REFERENCES colors(color_id),
                                                               PRIMARY KEY (product_id,
                                                                            color_id));


CREATE TABLE weights (weight_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                         weight_name VARCHAR(100) NOT NULL);


CREATE TABLE product_weights (product_id UUID NOT NULL,
                                              weight_id UUID NOT NULL,
                              FOREIGN KEY (product_id) REFERENCES products(product_id),
                              FOREIGN KEY (weight_id) REFERENCES weights(weight_id),
                                                                 PRIMARY KEY (product_id,
                                                                              weight_id));


CREATE TABLE sizes (size_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                     size_name VARCHAR(100) NOT NULL);


CREATE TABLE product_sizes (product_id UUID NOT NULL,
                                            size_id UUID NOT NULL,
                            FOREIGN KEY (product_id) REFERENCES products(product_id),
                            FOREIGN KEY (size_id) REFERENCES sizes(size_id),
                                                             PRIMARY KEY (product_id,
                                                                          size_id));


CREATE TABLE brands (brand_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                       brand_name VARCHAR(100) NOT NULL);


CREATE TABLE product_brands (product_id UUID NOT NULL,
                                             brand_id UUID NOT NULL,
                             FOREIGN KEY (product_id) REFERENCES products(product_id),
                             FOREIGN KEY (brand_id) REFERENCES brands(brand_id),
                                                               PRIMARY KEY (product_id,
                                                                            brand_id));


CREATE TABLE tags (tag_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                   tag_name VARCHAR(100) NOT NULL);


CREATE TABLE product_tags (product_id UUID NOT NULL,
                                           tag_id UUID NOT NULL,
                           FOREIGN KEY (product_id) REFERENCES products(product_id),
                           FOREIGN KEY (tag_id) REFERENCES tags(tag_id),
                                                           PRIMARY KEY (product_id,
                                                                        tag_id));


CREATE TABLE product_categories (category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                                      category_name VARCHAR(255) NOT NULL);


CREATE TABLE events (event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                       title VARCHAR(255) NOT NULL,
                                                                          descriptionText TEXT NOT NULL,
                                                                                               event_date DATE NOT NULL,
                                                                                                               publish_date DATE NOT NULL,
                                                                                                                                 images JSONB NOT NULL,
                                                                                                                                              ticket_images JSONB NOT NULL,
                                                                                                                                                                  location_address VARCHAR(255) NOT NULL,
                                                                                                                                                                                                adult_price DECIMAL(10, 2) NOT NULL,
                                                                                                                                                                                                                           child_price DECIMAL(10, 2),
                                                                                                                                                                                                                                       adult_quantity_tickets INT NOT NULL,
                                                                                                                                                                                                                                                                  children_quantity_tickets INT);


CREATE TABLE time_options (time_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                            time_value VARCHAR(10),
                                                                       time_label VARCHAR(10));


CREATE TABLE event_time_options (event_id UUID NOT NULL,
                                               time_id UUID NOT NULL,
                                 FOREIGN KEY (event_id) REFERENCES events(event_id),
                                 FOREIGN KEY (time_id) REFERENCES time_options(time_id),
                                                                  PRIMARY KEY (event_id,
                                                                               time_id));


CREATE TABLE ticket_images (ticket_images_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                                      ticket_images JSONB NOT NULL,
                                                                                          title VARCHAR(255) NOT NULL,);

-- ALTER TABLE articles
-- ADD COLUMN publish_date DATE DEFAULT CURRENT_DATE NOT NULL;
 -- ALTER TABLE events ADD COLUMN status VARCHAR(50) DEFAULT 'draft';
 -- ALTER TABLE articles
-- ADD COLUMN publish_date DATE DEFAULT CURRENT_DATE NOT NULL;
 -- ALTER TABLE articles ADD COLUMN status VARCHAR(50) DEFAULT 'draft';

INSERT INTO time_options (time_value, time_label)
VALUES ('00:00',
        '00:00'), ('01:00',
                   '01:00'), ('02:00',
                              '02:00'), ('03:00',
                                         '03:00'), ('04:00',
                                                    '04:00'), ('05:00',
                                                               '05:00'), ('06:00',
                                                                          '06:00'), ('07:00',
                                                                                     '07:00'), ('08:00',
                                                                                                '08:00'), ('09:00',
                                                                                                           '09:00'), ('10:00',
                                                                                                                      '10:00'), ('11:00',
                                                                                                                                 '11:00'), ('12:00',
                                                                                                                                            '12:00'), ('13:00',
                                                                                                                                                       '13:00'), ('14:00',
                                                                                                                                                                  '14:00'), ('15:00',
                                                                                                                                                                             '15:00'), ('16:00',
                                                                                                                                                                                        '16:00'), ('17:00',
                                                                                                                                                                                                   '17:00'), ('18:00',
                                                                                                                                                                                                              '18:00'), ('19:00',
                                                                                                                                                                                                                         '19:00'), ('20:00',
                                                                                                                                                                                                                                    '20:00'), ('21:00',
                                                                                                                                                                                                                                               '21:00'), ('22:00',
                                                                                                                                                                                                                                                          '22:00'), ('23:00',
                                                                                                                                                                                                                                                                     '23:00');

-- slides main, shop

CREATE TABLE slides (slide_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                       slide_image JSONB NOT NULL,
                                                                         title VARCHAR(100),
                                                                               type VARCHAR(20) CHECK (type IN ('main_slide',
                                                                                                                'shop_slide')));


CREATE TABLE testimonials (testimonial_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                                   testimonial_image JSONB NOT NULL,
                                                                                           testimonial_description TEXT NOT NULL,
                                                                                                                        testimonial_author VARCHAR(100) NOT NULL,
                                                                                                                                                        testimonial_dignity TEXT, is_active BOOLEAN DEFAULT true);


CREATE TABLE about (about_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                      about_title VARCHAR(100),
                                                                  about_description TEXT NOT NULL);

-- ALTER TABLE testimonials
-- ADD COLUMN is_active BOOLEAN DEFAULT false;

CREATE TABLE contacts (contacts_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                            contacts_title VARCHAR(100) NOT NULL,
                                                                                        contacts_address VARCHAR(255) NOT NULL,
                                                                                                                      contacts_email VARCHAR(255) NOT NULL);


INSERT INTO tags (tag_id, tag_name)
VALUES (uuid_generate_v4(),
        'admin'), (uuid_generate_v4(),
                   'user');


CREATE TABLE testimonial_tags (testimonial_id UUID NOT NULL,
                                                   tag_id UUID NOT NULL,
                               FOREIGN KEY (testimonial_id) REFERENCES testimonials(testimonial_id),
                               FOREIGN KEY (tag_id) REFERENCES tags(tag_id),
                                                               PRIMARY KEY (testimonial_id,
                                                                            tag_id));


CREATE TABLE refund (refund_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                                                  refund_text TEXT NOT NULL);
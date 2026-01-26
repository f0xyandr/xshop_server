-- SQL script for initializing the xshop database

-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    specs JSONB,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    image_url TEXT,
    discount INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create cart_items table
CREATE TABLE cart_items (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, product_id)
);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cart_items_updated_at
BEFORE UPDATE ON cart_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ---
-- Mock Data
-- ---

-- Users
INSERT INTO users (username, email, password_hash) VALUES
('testuser', 'test@example.com', '$2b$10$abcdefghijklmnopqrstuv'),
('admin', 'admin@example.com', '$2b$10$abcdefghijklmnopqrstuv');

-- Categories (Root)
INSERT INTO categories (category_name, parent_id) VALUES
('Electronics', NULL),       -- id: 1
('Clothing', NULL),          -- id: 2
('Home & Kitchen', NULL),    -- id: 3
('Books', NULL);             -- id: 4

-- Categories (Subcategories)
INSERT INTO categories (category_name, parent_id) VALUES
('Laptops', 1),              -- id: 5 (under Electronics)
('Smartphones', 1),          -- id: 6 (under Electronics)
('Men''s Fashion', 2),       -- id: 7 (under Clothing)
('Women''s Fashion', 2),     -- id: 8 (under Clothing)
('Kitchen Appliances', 3);   -- id: 9 (under Home & Kitchen)

-- Products
INSERT INTO products (title, price, description, specs, category_id, image_url, discount) VALUES
('MacBook Pro 16', 2499.99, 'Supercharged by M2 Pro.', '{"ram": "16GB", "storage": "512GB SSD"}', 5, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673202', 10),
('iPhone 15 Pro', 999.99, 'Titanium. So strong. So light. So Pro.', '{"storage": "128GB", "color": "Natural Titanium"}', 6, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708', 0),
('Men''s Cotton T-Shirt', 19.99, 'Classic fit, 100% cotton.', '{"size": "L", "color": "Black"}', 7, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c27c6276856d48289467af6e01053153_9366/Essentials_Single_Jersey_Linear_Embroidered_Logo_Tee_Black_IC9278_21_model.jpg', 0),
('Women''s Summer Dress', 49.99, 'Light and breezy for the summer.', '{"size": "M", "material": "Viscose"}', 8, 'https://www.lulus.com/images/product/xlarge/8944661_1821438.jpg?w=560', 15),
('Coffee Maker', 89.99, 'Brew the perfect cup every morning.', '{"capacity": "12 cups"}', 9, 'https://i5.walmartimages.com/asr/c6239169-e07e-406a-85b4-d53957ee02b0.3015494a860718501171783f0c3dfc6a.jpeg', 5);
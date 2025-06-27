-- First, let's check and fix the RLS policies

-- 1. Check current RLS status
SELECT schemaname, tablename, rowsecurity, forcerowsecurity 
FROM pg_tables 
WHERE tablename IN ('users', 'products', 'categories', 'wishlist_items');

-- 2. Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('users', 'products', 'categories', 'wishlist_items');

-- 3. Drop existing policies and recreate them properly
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;

-- 4. Create proper RLS policies for users table
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 5. Make sure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 6. For products and categories, allow public read access
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable read access for all users" ON categories;

CREATE POLICY "Enable read access for all users" ON products
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON categories
    FOR SELECT USING (true);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 7. For wishlist_items, users can only access their own items
DROP POLICY IF EXISTS "Users can view own wishlist" ON wishlist_items;
DROP POLICY IF EXISTS "Users can insert own wishlist" ON wishlist_items;
DROP POLICY IF EXISTS "Users can update own wishlist" ON wishlist_items;
DROP POLICY IF EXISTS "Users can delete own wishlist" ON wishlist_items;

CREATE POLICY "Users can view own wishlist" ON wishlist_items
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wishlist" ON wishlist_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wishlist" ON wishlist_items
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own wishlist" ON wishlist_items
    FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- 8. Check the results
SELECT 'RLS Policies Created Successfully' as status;

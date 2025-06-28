-- Let's check the exact permissions and structure of the users table

-- 1. Check table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- 2. Check if RLS is enabled
SELECT 
    schemaname, 
    tablename, 
    rowsecurity, 
    forcerowsecurity 
FROM pg_tables 
WHERE tablename = 'users';

-- 3. Temporarily disable RLS on users table for testing
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- 4. Grant permissions to authenticated users
GRANT ALL ON users TO authenticated;
GRANT ALL ON users TO anon;

-- 5. Test insert directly
INSERT INTO users (id, email, name, created_at, updated_at) 
VALUES (
    gen_random_uuid(), 
    'test-direct@example.com', 
    'Test Direct User', 
    now(), 
    now()
) 
ON CONFLICT (id) DO NOTHING;

-- 6. Check if the insert worked
SELECT 'Direct insert test completed' as status;
SELECT count(*) as total_users FROM users;

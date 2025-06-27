-- Let's check the current state and fix any issues

-- 1. Check if we have any auth users (this might fail if we don't have access)
SELECT 'Checking auth setup...' as status;

-- 2. Check our users table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- 3. Check current users
SELECT id, email, name, created_at FROM users ORDER BY created_at DESC LIMIT 5;

-- 4. Let's make sure our trigger function exists and is working
SELECT proname, prosrc FROM pg_proc WHERE proname = 'handle_new_user';

-- 5. Check if the trigger exists
SELECT trigger_name, event_manipulation, event_object_table 
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

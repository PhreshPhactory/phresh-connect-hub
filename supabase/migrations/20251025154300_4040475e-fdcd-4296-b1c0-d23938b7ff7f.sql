-- Add products column to store multiple product links
ALTER TABLE blog_posts
ADD COLUMN products jsonb DEFAULT '[]'::jsonb;

COMMENT ON COLUMN blog_posts.products IS 'Array of products with brand_name, item_name, and link fields';

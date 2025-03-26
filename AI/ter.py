import psycopg2

DATABASE_URL = "postgresql://neondb_owner:npg_3xoFhEm1cLav@ep-small-rain-a1qhgkay-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    cursor.execute("SELECT 1;")  # Simple test query
    print("✅ Database connection successful!")
    conn.close()
except Exception as e:
    print(f"❌ Error connecting to DB: {e}")

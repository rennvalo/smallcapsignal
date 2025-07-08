
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API key for authentication
API_KEY = os.getenv("API_KEY")
print(f"Config loaded API_KEY: {API_KEY}")
print(f"Config API_KEY length: {len(API_KEY) if API_KEY else 0}")

if not API_KEY:
    raise RuntimeError("API_KEY is missing in environment variables. Please set it in your .env file.")

# Email settings
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
EMAIL_SENDER = os.getenv("EMAIL_ADDRESS")
EMAIL_RECIPIENT = os.getenv("EMAIL_ADDRESS")  # Where to receive contact form messages
DOMAIN_SENDER = os.getenv("DOMAIN_SENDER")  # Domain sender for newsletters

# Database settings
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)

# Database connection strings
DATABASE_URL = f"sqlite:///{os.path.join(DATA_DIR, 'posts.db')}"
SUBSCRIBERS_DATABASE_URL = f"sqlite:///{os.path.join(DATA_DIR, 'subscribers.db')}"

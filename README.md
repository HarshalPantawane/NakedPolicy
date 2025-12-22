### `.env` file setup

```
# Database Type: 'json' or 'dynamodb'
# - json: Local file storage (good for development, single server)
# - dynamodb: AWS DynamoDB (good for production, multi-server, scalability)
DB_TYPE=dynamodb

# Cache Settings
CACHE_ENABLED=true
CACHE_EXPIRY_DAYS=30


# DynamoDB Table Configuration
DYNAMODB_TABLE_NAME=naked-policy-summaries
DYNAMODB_REGION=us-east-1

# AWS Credentials (or use IAM roles)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# Perplexity API Key (for AI summarization)
PERPLEXITY_API_KEY=

# Flask Environment: development or production
FLASK_ENV=development

# Server Port
PORT=5000
```
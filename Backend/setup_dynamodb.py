"""
DynamoDB Table Setup Script
Creates the necessary DynamoDB table for NakedPolicy caching system

Usage:
    python setup_dynamodb.py

Requirements:
    - AWS credentials configured in .env file or AWS CLI
    - boto3 installed (pip install boto3)
"""

import boto3
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def create_dynamodb_table():
    """
    Create DynamoDB table with proper schema for NakedPolicy
    
    Table Schema:
    - Primary Key: summary_id (String)
    - GSI: url_hash-index for URL lookups
    """
    
    # Get configuration from environment
    table_name = os.environ.get("DYNAMODB_TABLE_NAME", "naked-policy-summaries")
    region_name = os.environ.get("DYNAMODB_REGION", "us-east-1")
    aws_access_key_id = os.environ.get("AWS_ACCESS_KEY_ID")
    aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
    
    print(f"\n🔧 Setting up DynamoDB table: {table_name}")
    print(f"📍 Region: {region_name}")
    
    # Initialize DynamoDB client
    session_params = {'region_name': region_name}
    if aws_access_key_id and aws_secret_access_key:
        session_params['aws_access_key_id'] = aws_access_key_id
        session_params['aws_secret_access_key'] = aws_secret_access_key
        print(f"🔑 Using credentials from .env file")
    else:
        print(f"🔑 Using AWS CLI credentials or IAM role")
    
    try:
        dynamodb = boto3.resource('dynamodb', **session_params)
        
        # Check if table already exists
        try:
            existing_table = dynamodb.Table(table_name)
            existing_table.load()
            print(f"\n⚠️  Table '{table_name}' already exists!")
            print(f"   Status: {existing_table.table_status}")
            
            response = input("\nDo you want to delete and recreate it? (yes/no): ")
            if response.lower() != 'yes':
                print("❌ Setup cancelled.")
                return
            
            # Delete existing table
            print(f"\n🗑️  Deleting existing table...")
            existing_table.delete()
            existing_table.wait_until_not_exists()
            print(f"✅ Table deleted successfully")
        
        except dynamodb.meta.client.exceptions.ResourceNotFoundException:
            print(f"\n✨ Creating new table...")
        
        # Create table
        table = dynamodb.create_table(
            TableName=table_name,
            KeySchema=[
                {
                    'AttributeName': 'summary_id',
                    'KeyType': 'HASH'  # Partition key
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'summary_id',
                    'AttributeType': 'S'  # String
                },
                {
                    'AttributeName': 'url_hash',
                    'AttributeType': 'S'  # String
                }
            ],
            GlobalSecondaryIndexes=[
                {
                    'IndexName': 'url_hash-index',
                    'KeySchema': [
                        {
                            'AttributeName': 'url_hash',
                            'KeyType': 'HASH'
                        }
                    ],
                    'Projection': {
                        'ProjectionType': 'ALL'
                    },
                    'ProvisionedThroughput': {
                        'ReadCapacityUnits': 5,
                        'WriteCapacityUnits': 5
                    }
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )
        
        print(f"\n⏳ Waiting for table to be created...")
        table.wait_until_exists()
        
        print(f"\n✅ SUCCESS! DynamoDB table created successfully!")
        print(f"\n📋 Table Details:")
        print(f"   Name: {table_name}")
        print(f"   Region: {region_name}")
        print(f"   Primary Key: summary_id")
        print(f"   GSI: url_hash-index")
        print(f"   Status: {table.table_status}")
        
        print(f"\n🎉 You can now use DynamoDB caching!")
        print(f"\n📝 Make sure your .env file has:")
        print(f"   DB_TYPE=dynamodb")
        print(f"   DYNAMODB_TABLE_NAME={table_name}")
        print(f"   DYNAMODB_REGION={region_name}")
        
    except Exception as e:
        print(f"\n❌ Error creating table: {e}")
        print(f"\n🔍 Troubleshooting:")
        print(f"   1. Check your AWS credentials in .env")
        print(f"   2. Verify IAM permissions (dynamodb:CreateTable)")
        print(f"   3. Check your AWS region is correct")
        print(f"   4. Ensure boto3 is installed: pip install boto3")
        raise


def test_connection():
    """Test DynamoDB connection"""
    
    table_name = os.environ.get("DYNAMODB_TABLE_NAME", "naked-policy-summaries")
    region_name = os.environ.get("DYNAMODB_REGION", "us-east-1")
    aws_access_key_id = os.environ.get("AWS_ACCESS_KEY_ID")
    aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
    
    session_params = {'region_name': region_name}
    if aws_access_key_id and aws_secret_access_key:
        session_params['aws_access_key_id'] = aws_access_key_id
        session_params['aws_secret_access_key'] = aws_secret_access_key
    
    try:
        print(f"\n🔍 Testing connection to {table_name}...")
        dynamodb = boto3.resource('dynamodb', **session_params)
        table = dynamodb.Table(table_name)
        table.load()
        
        print(f"✅ Connection successful!")
        print(f"   Table status: {table.table_status}")
        print(f"   Item count: {table.item_count}")
        
        return True
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False


if __name__ == '__main__':
    print("=" * 60)
    print("  DynamoDB Setup for NakedPolicy")
    print("=" * 60)
    
    # Check if .env file exists
    if not os.path.exists('.env'):
        print("\n⚠️  WARNING: .env file not found!")
        print("   Please create a .env file with your AWS credentials:")
        print("")
        print("   AWS_ACCESS_KEY_ID=your_access_key")
        print("   AWS_SECRET_ACCESS_KEY=your_secret_key")
        print("   DYNAMODB_TABLE_NAME=naked-policy-summaries")
        print("   DYNAMODB_REGION=us-east-1")
        print("")
        response = input("Do you want to continue anyway? (yes/no): ")
        if response.lower() != 'yes':
            print("❌ Setup cancelled.")
            exit(1)
    
    try:
        create_dynamodb_table()
        print("\n" + "=" * 60)
        test_connection()
        print("=" * 60)
        print("\n✅ Setup complete! You're ready to use DynamoDB caching.")
        
    except KeyboardInterrupt:
        print("\n\n❌ Setup cancelled by user.")
    except Exception as e:
        print(f"\n❌ Setup failed: {e}")
        exit(1)

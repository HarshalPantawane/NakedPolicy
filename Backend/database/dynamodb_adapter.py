"""
DynamoDB Database Implementation
Cloud-based storage with URL caching
"""

import uuid
import boto3
from datetime import datetime
from typing import Optional, Dict, List
from .db_interface import DatabaseInterface
from decimal import Decimal
import json


class DynamoDBAdapter(DatabaseInterface):
    """
    DynamoDB database implementation with URL-based caching
    
    Table Schema:
    - Primary Key: summary_id (String) - UUID for each summary
    - GSI (Global Secondary Index): url_hash (String) - For URL lookups
    
    Attributes:
    - summary_id: Unique identifier
    - url: Original URL
    - normalized_url: Normalized URL for consistency
    - url_hash: Hash of normalized URL (for indexing)
    - short_summary: 50-word summary
    - full_summary: 1000-word summary
    - policy_types: List of policy types
    - timestamp: ISO timestamp
    - created_at: Human-readable creation time
    - updated_at: Last update time
    """
    
    def __init__(self, table_name='naked-policy-summaries', region_name='us-east-1',
                 aws_access_key_id=None, aws_secret_access_key=None):
        """
        Initialize DynamoDB connection
        
        Args:
            table_name: Name of DynamoDB table
            region_name: AWS region
            aws_access_key_id: AWS access key (optional, can use environment variables)
            aws_secret_access_key: AWS secret key (optional, can use environment variables)
        """
        self.table_name = table_name
        
        # Initialize DynamoDB client
        session_params = {'region_name': region_name}
        if aws_access_key_id and aws_secret_access_key:
            session_params['aws_access_key_id'] = aws_access_key_id
            session_params['aws_secret_access_key'] = aws_secret_access_key
        
        self.dynamodb = boto3.resource('dynamodb', **session_params)
        self.table = self.dynamodb.Table(table_name)
    
    def get_summary_by_url(self, url: str, expiry_days: int = None) -> Optional[Dict]:
        """
        Retrieve cached summary by URL using GSI
        Returns None if not found or if cache has expired
        
        Args:
            url: URL to look up
            expiry_days: Number of days before cache expires (None = never expire)
        """
        try:
            url_hash = self.generate_url_hash(url)
            
            # Query using GSI on url_hash
            response = self.table.query(
                IndexName='url_hash-index',
                KeyConditionExpression='url_hash = :url_hash',
                ExpressionAttributeValues={
                    ':url_hash': url_hash
                },
                Limit=1
            )
            
            if response['Items']:
                item = response['Items'][0]
                deserialized_item = self._deserialize_item(item)
                
                # Check if cache has expired
                if expiry_days is not None and 'timestamp' in deserialized_item:
                    if self.is_cache_expired(deserialized_item['timestamp'], expiry_days):
                        print(f"⏰ Cache expired for URL: {url}")
                        return None
                
                return deserialized_item
            
            return None
            
        except Exception as e:
            print(f"Error querying DynamoDB by URL: {e}")
            return None
    
    def save_summary(self, url: str, short_summary: str, full_summary: str,
                    policy_types: List[str] = None) -> str:
        """
        Save summary to DynamoDB
        If URL already exists, update the existing entry
        """
        try:
            url_hash = self.generate_url_hash(url)
            
            # Check if URL already exists
            existing = self.get_summary_by_url(url)
            
            if existing:
                # Update existing entry
                summary_id = existing['id']
                print(f"🔄 Updating existing summary in DynamoDB for URL: {url}")
            else:
                # Create new entry
                summary_id = str(uuid.uuid4())
                print(f"✨ Creating new summary in DynamoDB for URL: {url}")
            
            # Prepare item
            item = {
                'summary_id': summary_id,
                'url': url,
                'normalized_url': self.normalize_url(url),
                'url_hash': url_hash,
                'short_summary': short_summary,
                'full_summary': full_summary,
                'policy_types': policy_types or [],
                'timestamp': datetime.now().isoformat(),
                'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'updated_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'id': summary_id  # For compatibility with frontend
            }
            
            # Save to DynamoDB
            self.table.put_item(Item=item)
            
            return summary_id
            
        except Exception as e:
            print(f"Error saving to DynamoDB: {e}")
            raise
    
    def get_summary_by_id(self, summary_id: str) -> Optional[Dict]:
        """Retrieve summary by unique ID"""
        try:
            response = self.table.get_item(
                Key={'summary_id': summary_id}
            )
            
            if 'Item' in response:
                return self._deserialize_item(response['Item'])
            
            return None
            
        except Exception as e:
            print(f"Error retrieving from DynamoDB: {e}")
            return None
    
    def get_recent(self, limit: int = 10) -> List[Dict]:
        """
        Get most recent summaries
        Uses scan with filtering (not efficient for large datasets)
        Consider adding a sort key or separate GSI for production
        """
        try:
            response = self.table.scan(
                Limit=limit * 2  # Get extra to sort properly
            )
            
            items = response.get('Items', [])
            
            # Sort by timestamp
            sorted_items = sorted(
                items,
                key=lambda x: x.get('timestamp', ''),
                reverse=True
            )[:limit]
            
            return [self._deserialize_item(item) for item in sorted_items]
            
        except Exception as e:
            print(f"Error scanning DynamoDB: {e}")
            return []
    
    def delete_summary(self, summary_id: str) -> bool:
        """Delete a summary"""
        try:
            self.table.delete_item(
                Key={'summary_id': summary_id}
            )
            return True
        except Exception as e:
            print(f"Error deleting from DynamoDB: {e}")
            return False
    
    def _deserialize_item(self, item: Dict) -> Dict:
        """
        Convert DynamoDB item to regular Python dict
        Converts Decimal to int/float
        """
        return json.loads(json.dumps(item, default=self._decimal_default))
    
    def _decimal_default(self, obj):
        """Helper to convert Decimal to int/float"""
        if isinstance(obj, Decimal):
            if obj % 1 == 0:
                return int(obj)
            return float(obj)
        raise TypeError
    
    def get_cache_stats(self) -> Dict:
        """Get statistics about cache usage"""
        try:
            # This is expensive for large tables - use CloudWatch metrics in production
            response = self.table.scan(Select='COUNT')
            
            return {
                'total_summaries': response.get('Count', 0),
                'table_name': self.table_name,
                'table_status': self.table.table_status
            }
        except Exception as e:
            print(f"Error getting stats: {e}")
            return {'error': str(e)}


def create_dynamodb_table(table_name='naked-policy-summaries', region_name='us-east-1'):
    """
    Helper function to create DynamoDB table with proper schema
    
    Usage:
        from database.dynamodb_adapter import create_dynamodb_table
        create_dynamodb_table()
    """
    dynamodb = boto3.resource('dynamodb', region_name=region_name)
    
    try:
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
        
        # Wait for table to be created
        table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
        
        print(f"✅ DynamoDB table '{table_name}' created successfully!")
        print(f"   Region: {region_name}")
        print(f"   Primary Key: summary_id")
        print(f"   GSI: url_hash-index")
        
        return table
        
    except Exception as e:
        print(f"Error creating table: {e}")
        raise

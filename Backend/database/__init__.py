"""
Database Package
Supports multiple database backends: JSON, DynamoDB, etc.
"""

from .db_interface import DatabaseInterface
from .json_db import JSONDatabase
from .dynamodb_adapter import DynamoDBAdapter, create_dynamodb_table

__all__ = [
    'DatabaseInterface',
    'JSONDatabase',
    'DynamoDBAdapter',
    'create_dynamodb_table',
    'get_database'
]


def get_database(db_type='json', **kwargs):
    """
    Factory function to get database instance
    
    Args:
        db_type: Type of database ('json' or 'dynamodb')
        **kwargs: Additional arguments passed to database constructor
    
    Returns:
        DatabaseInterface instance
    
    Examples:
        # Use JSON database (default)
        db = get_database('json', storage_file='summaries_db.json')
        
        # Use DynamoDB
        db = get_database('dynamodb', 
                         table_name='naked-policy-summaries',
                         region_name='us-east-1')
    """
    if db_type.lower() == 'json':
        return JSONDatabase(**kwargs)
    elif db_type.lower() == 'dynamodb':
        return DynamoDBAdapter(**kwargs)
    else:
        raise ValueError(f"Unknown database type: {db_type}")

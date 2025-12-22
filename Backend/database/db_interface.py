"""
Database Interface Layer
Provides abstraction for different database backends (JSON, DynamoDB, etc.)
"""

from abc import ABC, abstractmethod
from typing import Optional, Dict, List
import hashlib
from datetime import datetime, timedelta


class DatabaseInterface(ABC):
    """Abstract base class for database operations"""
    
    @abstractmethod
    def get_summary_by_url(self, url: str) -> Optional[Dict]:
        """Retrieve cached summary by URL"""
        pass
    
    @abstractmethod
    def save_summary(self, url: str, short_summary: str, full_summary: str, 
                    policy_types: List[str] = None) -> str:
        """Save summary and return unique ID"""
        pass
    
    @abstractmethod
    def get_summary_by_id(self, summary_id: str) -> Optional[Dict]:
        """Retrieve summary by unique ID"""
        pass
    
    @abstractmethod
    def get_recent(self, limit: int = 10) -> List[Dict]:
        """Get recent summaries"""
        pass
    
    @abstractmethod
    def delete_summary(self, summary_id: str) -> bool:
        """Delete a summary"""
        pass
    
    def normalize_url(self, url: str) -> str:
        """
        Normalize URL for consistent caching
        Removes trailing slashes, converts to lowercase, removes fragments
        """
        url = url.strip().lower()
        # Remove protocol
        url = url.replace('https://', '').replace('http://', '')
        # Remove www.
        url = url.replace('www.', '')
        # Remove trailing slash
        url = url.rstrip('/')
        # Remove URL fragments
        url = url.split('#')[0]
        # Remove query parameters (optional - comment out if you want to cache per query param)
        # url = url.split('?')[0]
        return url
    
    def generate_url_hash(self, url: str) -> str:
        """Generate a hash from URL for use as a key"""
        normalized_url = self.normalize_url(url)
        return hashlib.sha256(normalized_url.encode()).hexdigest()[:16]
    
    def is_cache_expired(self, timestamp_str: str, expiry_days: int) -> bool:
        """
        Check if cached data has expired
        
        Args:
            timestamp_str: ISO format timestamp string
            expiry_days: Number of days before cache expires
        
        Returns:
            True if cache is expired, False otherwise
        """
        try:
            cached_time = datetime.fromisoformat(timestamp_str)
            expiry_time = datetime.now() - timedelta(days=expiry_days)
            return cached_time < expiry_time
        except (ValueError, TypeError):
            # If timestamp is invalid, consider it expired
            return True
    
    def delete_summary_by_url(self, url: str) -> bool:
        """
        Delete a summary by URL (for cache clearing)
        Default implementation - can be overridden
        """
        cached = self.get_summary_by_url(url)
        if cached:
            return self.delete_summary(cached['id'])
        return False

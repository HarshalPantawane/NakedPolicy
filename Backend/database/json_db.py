"""
JSON Database Implementation
File-based storage (current implementation)
"""

import json
import uuid
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, List
from .db_interface import DatabaseInterface


class JSONDatabase(DatabaseInterface):
    """JSON file-based database (backward compatible with summaries_db.json)"""
    
    def __init__(self, storage_file='summaries_db.json'):
        self.storage_file = Path(storage_file)
        self.data = self._load()
    
    def _load(self) -> Dict:
        """Load data from JSON file"""
        if self.storage_file.exists():
            try:
                with open(self.storage_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except:
                return {'summaries': {}, 'url_index': {}}
        return {'summaries': {}, 'url_index': {}}
    
    def _save(self):
        """Save data to JSON file"""
        with open(self.storage_file, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, indent=2, ensure_ascii=False)
    
    def get_summary_by_url(self, url: str, expiry_days: int = None) -> Optional[Dict]:
        """
        Retrieve cached summary by URL
        Returns None if not found or if cache has expired
        
        Args:
            url: URL to look up
            expiry_days: Number of days before cache expires (None = never expire)
        """
        url_hash = self.generate_url_hash(url)
        
        # Check if URL is in index
        if url_hash not in self.data.get('url_index', {}):
            return None
        
        summary_id = self.data['url_index'][url_hash]['summary_id']
        summary = self.data['summaries'].get(summary_id)
        
        if not summary:
            return None
        
        # Check if cache has expired
        if expiry_days is not None and 'timestamp' in summary:
            if self.is_cache_expired(summary['timestamp'], expiry_days):
                print(f"⏰ Cache expired for URL: {url}")
                return None
        
        return summary
    
    def save_summary(self, url: str, short_summary: str, full_summary: str, 
                    policy_types: List[str] = None) -> str:
        """
        Save summary with URL indexing for caching
        If URL already exists, update the existing entry
        """
        url_hash = self.generate_url_hash(url)
        
        # Check if URL already exists
        if url_hash in self.data.get('url_index', {}):
            # Update existing entry
            summary_id = self.data['url_index'][url_hash]['summary_id']
            print(f"🔄 Updating existing summary for URL: {url}")
        else:
            # Create new entry
            summary_id = str(uuid.uuid4())
            print(f"✨ Creating new summary for URL: {url}")
        
        # Ensure data structure exists
        if 'summaries' not in self.data:
            self.data['summaries'] = {}
        if 'url_index' not in self.data:
            self.data['url_index'] = {}
        
        # Save summary data
        self.data['summaries'][summary_id] = {
            'id': summary_id,
            'url': url,
            'normalized_url': self.normalize_url(url),
            'short_summary': short_summary,
            'full_summary': full_summary,
            'policy_types': policy_types or [],
            'timestamp': datetime.now().isoformat(),
            'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        # Update URL index for fast lookups
        self.data['url_index'][url_hash] = {
            'url': url,
            'normalized_url': self.normalize_url(url),
            'summary_id': summary_id,
            'last_accessed': datetime.now().isoformat()
        }
        
        self._save()
        return summary_id
    
    def get_summary_by_id(self, summary_id: str) -> Optional[Dict]:
        """Retrieve summary by unique ID"""
        return self.data['summaries'].get(summary_id)
    
    def get_recent(self, limit: int = 10) -> List[Dict]:
        """Get most recent summaries"""
        sorted_summaries = sorted(
            self.data['summaries'].values(),
            key=lambda x: x.get('timestamp', ''),
            reverse=True
        )
        return sorted_summaries[:limit]
    
    def delete_summary(self, summary_id: str) -> bool:
        """Delete a summary and its URL index"""
        if summary_id in self.data['summaries']:
            # Find and remove from URL index
            summary = self.data['summaries'][summary_id]
            url_hash = self.generate_url_hash(summary['url'])
            if url_hash in self.data.get('url_index', {}):
                del self.data['url_index'][url_hash]
            
            # Remove summary
            del self.data['summaries'][summary_id]
            self._save()
            return True
        return False
    
    def clear_old(self, days: int = 30) -> int:
        """Clear summaries older than specified days"""
        from datetime import timedelta
        cutoff = datetime.now() - timedelta(days=days)
        
        to_delete = []
        for sid, summary in self.data['summaries'].items():
            try:
                timestamp = datetime.fromisoformat(summary['timestamp'])
                if timestamp < cutoff:
                    to_delete.append(sid)
            except:
                continue
        
        for sid in to_delete:
            self.delete_summary(sid)
        
        return len(to_delete)
    
    def get_cache_stats(self) -> Dict:
        """Get statistics about cache usage"""
        return {
            'total_summaries': len(self.data['summaries']),
            'total_urls': len(self.data.get('url_index', {})),
            'storage_file': str(self.storage_file),
            'file_size_kb': self.storage_file.stat().st_size / 1024 if self.storage_file.exists() else 0
        }

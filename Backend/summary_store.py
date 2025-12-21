"""
Summary Storage System
Stores both short (50-word) and full (1000-word) summaries with unique IDs
"""

import json
import uuid
from datetime import datetime
from pathlib import Path

class SummaryStore:
    def __init__(self, storage_file='summaries_db.json'):
        self.storage_file = Path(storage_file)
        self.summaries = self._load()
    
    def _load(self):
        """Load summaries from JSON file"""
        if self.storage_file.exists():
            try:
                with open(self.storage_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except:
                return {}
        return {}
    
    def _save(self):
        """Save summaries to JSON file"""
        with open(self.storage_file, 'w', encoding='utf-8') as f:
            json.dump(self.summaries, f, indent=2, ensure_ascii=False)
    
    def save_summary(self, url, short_summary, full_summary, policy_types=None):
        """
        Save both short and full summaries
        
        Args:
            url: Website URL
            short_summary: 50-word summary for extension
            full_summary: 1000-word summary for frontend
            policy_types: List of policy types found (privacy, terms, etc.)
        
        Returns:
            summary_id: Unique identifier for this summary
        """
        summary_id = str(uuid.uuid4())
        
        self.summaries[summary_id] = {
            'id': summary_id,
            'url': url,
            'short_summary': short_summary,
            'full_summary': full_summary,
            'policy_types': policy_types or [],
            'timestamp': datetime.now().isoformat(),
            'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        self._save()
        return summary_id
    
    def get_summary(self, summary_id):
        """
        Retrieve a summary by ID
        
        Args:
            summary_id: Unique identifier
        
        Returns:
            dict: Summary data or None if not found
        """
        return self.summaries.get(summary_id)
    
    def get_recent(self, limit=10):
        """Get most recent summaries"""
        sorted_summaries = sorted(
            self.summaries.values(),
            key=lambda x: x['timestamp'],
            reverse=True
        )
        return sorted_summaries[:limit]
    
    def delete_summary(self, summary_id):
        """Delete a summary"""
        if summary_id in self.summaries:
            del self.summaries[summary_id]
            self._save()
            return True
        return False
    
    def clear_old(self, days=30):
        """Clear summaries older than specified days"""
        from datetime import timedelta
        cutoff = datetime.now() - timedelta(days=days)
        
        to_delete = []
        for sid, summary in self.summaries.items():
            timestamp = datetime.fromisoformat(summary['timestamp'])
            if timestamp < cutoff:
                to_delete.append(sid)
        
        for sid in to_delete:
            del self.summaries[sid]
        
        if to_delete:
            self._save()
        
        return len(to_delete)

# Global instance
store = SummaryStore()

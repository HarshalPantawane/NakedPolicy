#!/usr/bin/env python3
"""
Test the policy summarization flow:
1. Read a policy file
2. Send to Flask backend
3. Get AI summary
4. Save the summary
"""

import requests
import json
import os
import time

def test_summarize(policy_file):
    """Test summarization with a policy file"""
    
    # Check if file exists
    if not os.path.exists(policy_file):
        print(f"❌ File not found: {policy_file}")
        return
    
    # Read policy text
    print(f"📖 Reading {policy_file}...")
    with open(policy_file, 'r', encoding='utf-8') as f:
        policy_text = f.read()
    
    print(f"   Size: {len(policy_text)} characters")
    
    # Send to backend
    print("\n🚀 Sending to AI backend...")
    try:
        response = requests.post(
            'http://localhost:5000/summarize',
            json={'text': policy_text},
            headers={'Content-Type': 'application/json'},
            timeout=120  # 2 minute timeout for AI processing
        )
        
        if response.status_code == 200:
            summary = response.json()['summary']
            print("\n✅ Summary generated successfully!\n")
            print("=" * 60)
            print(summary)
            print("=" * 60)
            
            # Save summary
            os.makedirs('summaries', exist_ok=True)
            base_name = os.path.basename(policy_file).replace('.txt', '')
            summary_file = f"summaries/{base_name}_summary.md"
            
            with open(summary_file, 'w', encoding='utf-8') as f:
                f.write(f"# Summary of {os.path.basename(policy_file)}\n\n")
                f.write(summary)
            
            print(f"\n💾 Saved to: {summary_file}")
            return summary_file
            
        else:
            print(f"\n❌ Error {response.status_code}: {response.json()}")
            return None
            
    except requests.exceptions.ConnectionError:
        print("\n❌ Cannot connect to backend. Is the Flask server running?")
        print("   Start it with: python app.py")
        return None
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return None

def main():
    print("=" * 60)
    print("🔍 POLICY SUMMARIZATION TEST")
    print("=" * 60)
    
    # Find available policy files
    policy_files = []
    if os.path.exists('policies'):
        policy_files = [
            os.path.join('policies', f) 
            for f in os.listdir('policies') 
            if f.endswith('.txt') and os.path.getsize(os.path.join('policies', f)) > 1000
        ]
    
    if not policy_files:
        print("\n❌ No policy files found in ./policies directory")
        print("   Run: python policy_fetcher_safe.py github.com")
        return
    
    print(f"\n📁 Found {len(policy_files)} policy files:")
    for i, f in enumerate(policy_files[:5], 1):  # Show first 5
        size = os.path.getsize(f)
        print(f"   {i}. {os.path.basename(f)} ({size:,} bytes)")
    
    # Test with the first large policy file
    test_file = policy_files[0]
    print(f"\n🧪 Testing with: {os.path.basename(test_file)}\n")
    
    test_summarize(test_file)

if __name__ == '__main__':
    main()

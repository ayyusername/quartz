#!/usr/bin/env python3
"""
Sync published notes from Obsidian vault to Quartz content folder
"""

import os
import shutil
import re
from pathlib import Path

VAULT_PATH = "/Users/josh/ObsidianVault"
CONTENT_PATH = "/Users/josh/Desktop/quartz/content"

def has_publish_true(file_path):
    """Check if a markdown file has 'publish: true' in frontmatter"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Check for frontmatter
        if content.startswith('---'):
            end_idx = content.find('---', 3)
            if end_idx != -1:
                frontmatter = content[3:end_idx]
                return 'publish: true' in frontmatter or 'publish:true' in frontmatter
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    return False

def sync_published_notes():
    """Copy published notes from vault to content folder"""
    vault_path = Path(VAULT_PATH)
    content_path = Path(CONTENT_PATH)
    
    # Clear existing content
    if content_path.exists():
        shutil.rmtree(content_path)
    content_path.mkdir(parents=True)
    
    # Find and copy published markdown files
    for md_file in vault_path.rglob("*.md"):
        # Skip .obsidian and other hidden folders
        if any(part.startswith('.') for part in md_file.parts):
            continue
            
        if has_publish_true(md_file):
            # Create relative path structure
            rel_path = md_file.relative_to(vault_path)
            dest_path = content_path / rel_path
            
            # Create destination directory
            dest_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Copy file
            shutil.copy2(md_file, dest_path)
            print(f"Copied: {rel_path}")
    
    # Copy assets (images, etc.) referenced by published notes
    for asset_ext in ['*.png', '*.jpg', '*.jpeg', '*.gif', '*.pdf']:
        for asset_file in vault_path.rglob(asset_ext):
            # Skip .obsidian folders
            if any(part.startswith('.') for part in asset_file.parts):
                continue
                
            rel_path = asset_file.relative_to(vault_path)
            dest_path = content_path / rel_path
            dest_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(asset_file, dest_path)
            print(f"Copied asset: {rel_path}")

if __name__ == "__main__":
    print("Syncing published notes from Obsidian vault...")
    sync_published_notes()
    print("Sync complete!")
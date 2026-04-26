#!/usr/bin/env python3
"""
DaiZ Delights - Image Downloader
Downloads sample brownie and blondie images from Unsplash
"""

import os
import requests
from pathlib import Path

# Create images directory if it doesn't exist
images_dir = Path(__file__).parent / 'images'
images_dir.mkdir(exist_ok=True)

# Image URLs - Free stock photos from Unsplash
images_to_download = {
    'hero-brownie.jpg': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80',
    'classic-brownie.jpg': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    'walnut-brownie.jpg': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80',
    'classic-blondie.jpg': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    'caramel-blondie.jpg': 'https://images.unsplash.com/photo-1618760007032-dab5f32b20b7?w=800&q=80',
    'fudge-brownie.jpg': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80',
    'macadamia-blondie.jpg': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    'about-us.jpg': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'
}

def download_image(filename, url):
    """Download a single image"""
    filepath = images_dir / filename

    try:
        print(f"Downloading {filename}...", end=' ')
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        with open(filepath, 'wb') as f:
            f.write(response.content)

        file_size = filepath.stat().st_size / 1024  # Size in KB
        print(f"✓ Done ({file_size:.1f} KB)")
        return True
    except Exception as e:
        print(f"✗ Failed: {str(e)}")
        return False

def main():
    """Main function to download all images"""
    print("=" * 50)
    print("🎂 DaiZ Delights - Image Downloader")
    print("=" * 50)
    print(f"Destination: {images_dir}")
    print(f"Images to download: {len(images_to_download)}")
    print("-" * 50)

    successful = 0
    failed = 0

    for filename, url in images_to_download.items():
        if download_image(filename, url):
            successful += 1
        else:
            failed += 1

    print("-" * 50)
    print(f"Download Complete!")
    print(f"✓ Successful: {successful}")
    print(f"✗ Failed: {failed}")
    print("=" * 50)

    if failed > 0:
        print("\nNote: If downloads failed, you can manually download images from:")
        print("  - Unsplash.com")
        print("  - Pexels.com")
        print("  - Pixabay.com")
        print("\nPlace them in the 'images' folder with these names:")
        for filename in images_to_download.keys():
            print(f"  - {filename}")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nDownload cancelled by user.")
    except ImportError:
        print("Error: requests library not found.")
        print("Install it with: pip install requests")

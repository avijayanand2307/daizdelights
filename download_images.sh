#!/bin/bash
# DaiZ Delights - Image Download Script (for macOS/Linux)
# Usage: bash download_images.sh

# Create images directory if it doesn't exist
mkdir -p images

# Function to download image
download_image() {
    local filename=$1
    local url=$2

    echo "Downloading $filename..."
    curl -o "images/$filename" "$url"

    if [ $? -eq 0 ]; then
        local size=$(ls -lh "images/$filename" | awk '{print $5}')
        echo "✓ $filename ($size)"
    else
        echo "✗ Failed to download $filename"
    fi
}

echo "========================================="
echo "🎂 DaiZ Delights - Image Downloader"
echo "========================================="
echo ""

# Download images from Unsplash
download_image "hero-brownie.jpg" "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80"
download_image "classic-brownie.jpg" "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
download_image "walnut-brownie.jpg" "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80"
download_image "classic-blondie.jpg" "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
download_image "caramel-blondie.jpg" "https://images.unsplash.com/photo-1618760007032-dab5f32b20b7?w=800&q=80"
download_image "fudge-brownie.jpg" "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80"
download_image "macadamia-blondie.jpg" "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
download_image "about-us.jpg" "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"

echo ""
echo "========================================="
echo "✅ Download Complete!"
echo "Images saved to: images/"
echo "========================================="
echo ""
echo "Next: Refresh your browser to see the images!"

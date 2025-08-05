const fs = require('fs');
const path = require('path');

// Test script to verify thumbnail storage setup
console.log('Testing thumbnail storage setup...\n');

// Check if thumbnail directory exists
const thumbnailDir = path.join(__dirname, 'uploads/thumbnails');
console.log('Thumbnail directory path:', thumbnailDir);

if (fs.existsSync(thumbnailDir)) {
  console.log('✅ Thumbnail directory exists');
  
  // List files in thumbnail directory
  const files = fs.readdirSync(thumbnailDir);
  console.log('📁 Files in thumbnail directory:', files);
  
  if (files.length > 0) {
    console.log('✅ Thumbnail directory contains files');
  } else {
    console.log('⚠️  Thumbnail directory is empty');
  }
} else {
  console.log('❌ Thumbnail directory does not exist');
  
  // Try to create it
  try {
    fs.mkdirSync(thumbnailDir, { recursive: true });
    console.log('✅ Created thumbnail directory');
  } catch (error) {
    console.log('❌ Failed to create thumbnail directory:', error.message);
  }
}

// Check if default thumbnail exists
const defaultThumbnail = path.join(thumbnailDir, 'CNotes-Logo.png');
if (fs.existsSync(defaultThumbnail)) {
  console.log('✅ Default thumbnail exists');
} else {
  console.log('⚠️  Default thumbnail not found');
}

console.log('\nTest completed!'); 
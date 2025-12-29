# APK Download Setup

## How to Add Your APK File

1. **Build your APK**: 
   - Build a release APK of your Hawk Buddy app from your Flutter project
   - Run: `flutter build apk --release`
   - The APK will be in: `build/app/outputs/flutter-apk/app-release.apk`

2. **Copy the APK to this folder**:
   ```bash
   cp /path/to/your/flutter/project/build/app/outputs/flutter-apk/app-release.apk ./public/downloads/hawk-buddy.apk
   ```

3. **That's it!** The download button will automatically appear on your portfolio.

## File Size Considerations

- APK files can be large (20-50MB+)
- Vercel has a file size limit of **100MB per file** for deployments
- If your APK is too large, consider these alternatives:
  1. **Google Drive**: Upload to Google Drive and make it publicly accessible
  2. **GitHub Releases**: Add APK to your GitHub repository releases
  3. **Firebase Hosting**: Host the APK on Firebase Storage

## Alternative Hosting Options

### Option 1: Google Drive
1. Upload APK to Google Drive
2. Get shareable link
3. Update the `apkDownload` link in `components/ProjectsSection.tsx` to:
   ```tsx
   apkDownload: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID"
   ```

### Option 2: GitHub Releases
1. Create a release on your GitHub repository
2. Attach the APK file
3. Update the link to point to the release asset URL

### Option 3: External CDN
- Use services like Cloudflare R2, AWS S3, or Firebase Storage
- These are better for large files and provide better download speeds

## Current Setup
- **Path**: `/public/downloads/hawk-buddy.apk`
- **URL**: Your visitors will download from `https://yoursite.com/downloads/hawk-buddy.apk`
- **Button**: Blue gradient "Download APK" button with download icon

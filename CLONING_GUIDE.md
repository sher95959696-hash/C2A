# 🚀 Naye Client Ke Liye App Rebranding Guide

Agar aap ye app kisi aur ko bech rahe hain, toh sirf ye steps follow karein:

### 1. Shop ki Information (Name, Logo, Colors)
**File Path:** `constants.tsx`
*   **Line 5 to 10:** Yahan `shopName`, `shopSlogan`, aur `logoUrl` change karein.
*   **Line 11 to 12:** `primaryColor` aur `secondaryColor` ke hex codes update karein.
*   **Line 13 to 17:** Contact info (`phone`, `whatsapp`, `address`) aur `adminPassword` change karein.

### 2. Firebase Database Connect Karna
**File Path:** `firebase.ts`
*   **Step A**: [Firebase Console](https://console.firebase.google.com/) pe jayein, naya project banayein.
*   **Step B**: "Project Settings" > "General" mein jayein aur "Web App" add karein.
*   **Step C (Line 8 to 16)**: Wahan se milne wali `firebaseConfig` ko is file mein paste kar dein.
*   **Step D (Line 21)**: "Cloud Messaging" > "Web Push certificates" mein VAPID key generate karke yahan update karein.

### 3. Android Build Taiyar Karna
**File Path:** `capacitor.config.ts`
*   **Line 5 (`appId`)**: Isay unique rakhein, jaise `com.shopname.app`.
*   **Line 8 (`appName`)**: Phone ki home screen pe jo naam nazar ayega, wo yahan likhein.

### 4. App Icon Change Karna
1. Client ka logo (`1024x1024` size, PNG format) lein.
2. Iska naam `icon.png` rakhein.
3. Is file ko project ke **Main Folder (Root)** mein upload kar dein jahan `package.json` mojood hai.
4. GitHub Actions khud hi naya icon build kar dega.

### 5. Admin Panel se Settings
App install karne ke baad:
1. `/admin` pe jayein (Password "1234").
2. **Setup Tab** mein Cloudinary ki keys (Cloud Name aur Upload Preset) daalein taake photos upload ho sakein.
3. **Menu** aur **Staff** tabs mein unki services aur barbers add karein.

---
**Tip:** Coding mein changes karne ke baad GitHub pe push karein, aur Actions tab se naya APK download kar lein.
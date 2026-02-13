
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // UNIQUE App ID for the Admin build. 
  // IMPORTANT: For User app, use 'com.barberpro.user'
  // For Admin app, use 'com.barberpro.admin'
  appId: 'com.barberpro.admin', 
  
  // Yahan jo naam likhenge, wahi mobile ki home screen pe icon ke neechy nazar ayega
  appName: 'Admin Pannel', 
  
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};

export default config;

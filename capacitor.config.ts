
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // UNIQUE App ID for the Admin build. 
  // IMPORTANT: For User app, use 'com.barberpro.user'
  // For Admin app, use 'com.barberpro.admin'
  appId: 'com.RazorsEdgeLtd.admin', 
  
  // Yahan jo naam likhenge, wahi mobile ki home screen pe icon ke neechy nazar ayega
  appName: 'Rezor's Admin Pannel', 
  
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

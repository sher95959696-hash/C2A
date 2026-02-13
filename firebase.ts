import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";

/**
 * ✅ FIREBASE CONFIGURATION
 */
const firebaseConfig = {
  apiKey: "AIzaSyDWyNyDSVc1CAlW7aGQ7kR3be8LBd3ls5I",
  authDomain: "rezor-s-edge.firebaseapp.com",
  projectId: "rezor-s-edge",
  storageBucket: "rezor-s-edge.firebasestorage.app",
  messagingSenderId: "555584318054",
  appId: "1:555584318054:web:56f6e2c5787551c2299ba7"
};

/**
 * ✅ WEB PUSH VAPID KEY
 */
export const VAPID_KEY = "BBPRHuNoDBtF9jBru7JkfEb6FpNk3dumjqM3exNoma9xwSRPOYIF9vnKfXYt1CGuSZSOLi1dzw-VOdE5hAqQ-BU";

export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("YOUR_");
};

// Ensure Firebase is initialized only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize and export Firestore
export const db = getFirestore(app);

// Initialize and export Messaging
export const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

export const requestForToken = async () => {
  if (!messaging || !isFirebaseConfigured()) return null;
  
  if (!("Notification" in window)) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      return await getToken(messaging, { vapidKey: VAPID_KEY });
    }
  } catch (err) {
    console.warn('FCM Permission/Token Error:', err);
  }
  return null;
};

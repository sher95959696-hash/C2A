import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";

/**
 * ✅ FIREBASE CONFIGURATION
 */
const firebaseConfig = {
  apiKey: "AIzaSyC1LZEoRcctG9prkgUemsaQtdn30oSYInk",
  authDomain: "barber-app-fbf5c.firebaseapp.com",
  projectId: "barber-app-fbf5c",
  storageBucket: "barber-app-fbf5c.firebasestorage.app",
  messagingSenderId: "392401169789",
  appId: "1:392401169789:web:846975298f62e7cb683014",
  measurementId: "G-T3BGNZ979J"
};

/**
 * ✅ WEB PUSH VAPID KEY
 */
export const VAPID_KEY = "BM3GGUTVTnYeI37YoUIPzl_wOoqVna6hGsfRO2VrZ3gIKuEU6vcpaCivqsGKvnqNeyPGgsrTmD1v9_IP_QIRW4gBORooIlxMRrsxd2v7yr5ZBAM3JhAHA_ZTNthHZhEoZLMrrZx2h4PEgUEMjFXrrroKONiyDIVNomSDwnhSnaAa-c";

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
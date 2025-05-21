import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported, Messaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDXr5qpKqQMk_Z9KNdZJoQbAroHlo2zVOw",
  authDomain: "fir-push-notfication-84d1e.firebaseapp.com",
  projectId: "fir-push-notfication-84d1e",
  storageBucket: "fir-push-notfication-84d1e.firebasestorage.app",
  messagingSenderId: "1033295110241",
  appId: "1:1033295110241:web:412f96e909874134b20a20",
  measurementId: "G-YWVMKH6M1G",
};

const vapidKey = "BFhIjMLJNpvPClsY2NmI0xt57wa-5Kt_DPZK8OlRyesABz5aE1sS0jsJ_ZO_VHoxhTsoJVjJys1VLm2wFJGjBrg";

const app = initializeApp(firebaseConfig);

// Wrap messaging in a browser check
let messaging: Messaging;

if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    } else {
      console.warn("Firebase messaging is not supported in this browser.");
    }
  });
}

export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") throw new Error("Notification permission not granted");

    const supported = await isSupported();
    if (!supported) throw new Error("Firebase Messaging not supported on this device");

    const token = await getToken(getMessaging(app), { vapidKey });
    return token;
  } catch (err) {
    console.error("Error getting FCM token: ", err);
    throw err;
  }
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
}

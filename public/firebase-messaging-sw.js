
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


const firebaseConfig = {
  apiKey: "AIzaSyDXr5qpKqQMk_Z9KNdZJoQbAroHlo2zVOw",
  authDomain: "fir-push-notfication-84d1e.firebaseapp.com",
  projectId: "fir-push-notfication-84d1e",
  storageBucket: "fir-push-notfication-84d1e.firebasestorage.app",
  messagingSenderId: "1033295110241",
  appId: "1:1033295110241:web:412f96e909874134b20a20",
  measurementId: "G-YWVMKH6M1G"
};

firebase.initializeApp(firebaseConfig); 

const messaging = firebase.messaging(); 

messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message", payload);
  
})

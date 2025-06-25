// Import the functions you need from the SDKs you need
import { initializeApp, getApps , getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAkfN5M0SJCe7mJGz8OECpqU0YWq7tgC_c",
    authDomain: "ai-mock-interview-47c8e.firebaseapp.com",
    projectId: "ai-mock-interview-47c8e",
    storageBucket: "ai-mock-interview-47c8e.firebasestorage.app",
    messagingSenderId: "76527339964",
    appId: "1:76527339964:web:93927a19173e482e7183b9",
    measurementId: "G-VHBDP5GD38"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
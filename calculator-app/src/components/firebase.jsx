
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_API_DOMAIN,
	projectId: import.meta.env.VITE_API_PROJECTID,
	storageBucket: import.meta.env.VITE_API_BUCKET,
	messagingSenderId: import.meta.env.VITE_API_SENDERID,
	appId: import.meta.env.VITE_API_APPID,
	measurementId: import.meta.env.VITE_API_MEASUREID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
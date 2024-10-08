import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider} from "firebase/auth";

const firebaseConfig =
{
	apiKey:				process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain:			process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId:			process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket:		process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId:	process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId:				process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId:		process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app); 
const auth = getAuth(app);

const googleSignIn = async () =>
{
	const provider = new GoogleAuthProvider();
	try 
	{
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		console.log("Información del usuario de Google:", user);
		await createUserFavoritesCollection(user);
	} 
	catch (error) 
	{
		console.error("Error during Google sign-in:", error);
		alert("Error during Google sign-in. Please try logging in with GitHub.");
	}
};

const githubSignIn = async () =>
{
	const provider = new GithubAuthProvider();
	try 
	{
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		console.log("Información del usuario de GitHub:", user);
		await createUserFavoritesCollection(user);
	}
	catch (error) 
	{
		console.error("Error during GitHub sign-in:", error);
		alert("Error during GitHub sign-in. Please try logging in with Google.");
	}
};

const createUserFavoritesCollection = async (user) => 
{
  if (!user) return;

  const userRef = doc(db, `users/${user.uid}`);

	try
	{
		await setDoc(userRef, {email: user.email, displayName: user.displayName,createdAt: new Date(),}, { merge: true });
    	console.log("Colección de favoritos lista para el usuario:", user.uid);
	} 
	catch (error) 
  	{
    	console.error("Error al crear la colección de favoritos:", error);
  	}
};

export { app, analytics, db, storage, auth, googleSignIn, githubSignIn};

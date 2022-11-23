import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

initializeApp(firebaseConfig);

const firebaseRequest = (successCb, errorCb) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then((result) => successCb(result))
    .catch((error) => errorCb(error));
};

export default firebaseRequest;

import firebaseConfig from "../../firebase";
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

export const login = (form) => {
    return new Promise((resolve, reject) => {
       form.preventDefault();
       const email = form.target.email.value;
       const password = form.target.password.value;

       firebaseConfig.auth().signInWithEmailAndPassword(email, password)
       .then((response) => {
          resolve(response);
       })
       .catch((error) => {
          console.log(error);
          reject(error);
       });
    });
};

export const register = (form) => {
    return new Promise((resolve, reject) => {
       form.preventDefault();
       const email = form.target.email.value;
       const password = form.target.password.value;

       firebaseConfig.auth().createUserWithEmailAndPassword(email, password)       
       .then((response) => {
          if(response.error) return {error: response.error};
          resolve(response);
       })
       .catch((error) => {
          console.log(error);
          reject(error);
       });
    });
};

export const loginWithGoogle = () => {
    return new Promise((resolve, reject) => {
       const provider = new GoogleAuthProvider();
       firebaseConfig.auth().signInWithPopup(provider)
       .then((response) => {
          resolve(response);
       })
       .catch((error) => {
          console.log(error);
          reject(error);
       });
    });
}

export const loginWithFacebook = () => {
    return new Promise((resolve, reject) => {
       const provider = new FacebookAuthProvider();
       firebaseConfig.auth().signInWithPopup(provider)
       .then((response) => {
          resolve(response);
       })
       .catch((error) => {
          console.log(error);
          reject(error);
       });
    });
}   
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyDkwCdx86RtZ3RQM3epo0tWI8O0qVXt4j4",
    authDomain: "choudharystore-dd6ca.firebaseapp.com",
    projectId: "choudharystore-dd6ca",
    storageBucket: "choudharystore-dd6ca.appspot.com",
    messagingSenderId: "904530515468",
    appId: "1:904530515468:web:fbe3dd75d1db0dce064029",
    measurementId: "G-251TKWFZWT"
};

export const createUserProfileDocument = async (userAuth, additionData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await  userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionData
            })
        }
        catch (error ){
            console.log("Error creating user", error.message);
        }
    }
    return userRef;

}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment={
    BaseURL:"   http://localhost:3000/trips",  
}

export const environmentFirebase={
    production:false,
     firebaseConfig : {
        apiKey: "AIzaSyCrhzxo8Y36075P3o0_okMzSOcPegC5EvY",
        authDomain: "joytrips-6d980.firebaseapp.com",
        projectId: "joytrips-6d980",
        storageBucket: "joytrips-6d980.appspot.com",
        messagingSenderId: "1006872089752",
        appId: "1:1006872089752:web:d5ee6b35a4d34fcfc8eced",
        measurementId: "G-9EEBBDEF88"
      }

}

  
  
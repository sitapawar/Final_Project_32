import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc,collection, where, getDoc, query, queryEqual, getDocs, deleteDoc } from "firebase/firestore"; 




const firebaseConfig = {
    apiKey: "AIzaSyDFeVfX8f0WFdWFUdnfqthDBd2xrUyNKLU",
    authDomain: "yelpatbrown.firebaseapp.com",
    projectId: "yelpatbrown",
    storageBucket: "yelpatbrown.appspot.com",
    messagingSenderId: "1084334235202",
    appId: "1:1084334235202:web:b5aa021e6ad4474e7b57db",
    measurementId: "G-YTJBYSG9Y2"
  };
 // jest.setTimeout(1000000)
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

  



/**
 * We manually checked the firebase and saw the appearance of both the burger and sushi food items. The pizza document, however, 
 * was not there since it was deleted below
 */

test('adding item and pulling it back', async ()=>{

    // const docSnap = getDoc(docRef2);    
    await setDoc(doc(db,"xtestx", "burger"), {     
      food: "burger", 
      dininghall: "Jos",
      type: "Lunch",
      rating: {}
    })

    await setDoc(doc(db,"xtestx", "pizza"), {     
      food: "pizza", 
      dininghall: "Jos",
      type: "Lunch",
      rating: {}
    })

    await setDoc(doc(db,"xtestx", "sushi"), {     
      food: "sushi", 
      dininghall: "Jos",
      type: "Lunch",
      rating: {}
    })

    deleteDoc(doc(db,"xtestx", "pizza"))
})






import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc,collection, where, getDoc, query, queryEqual, getDocs, deleteDoc } from "firebase/firestore"; 
import {firebaseConfig} from './firebase'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

console.log("START AGGREGATION")
/*
*Agrregration involves transfering all the ratings stored in 'today food' into the 
*'all food' collection in order to store the ratings for future use. Once all the 
* ratings are transfered into 'all food' from today food then all the documents are deleted from 
*'today food' so the current foods can be added after scraping
*/


const docRef = collection(db,"today food")
const q = query(docRef)
//retrives all the documents from today food
const quer = await getDocs(q);
//loops over all the documents in today food
for (let i = 0; i < quer.docs.length; i++) {
  const todaysFood = quer.docs[i].data()
  
  const docRef = collection(db,"all food")
  //finds the document that has the same foodname and dininghall 
  const q = query(docRef, where("food", "==", todaysFood.food),where("dininghall", "==", todaysFood.dininghall));
  const docs = (await getDocs(q)).docs
  //if the document exists
  if (docs.length > 0) {
    const allFood = docs[0];

    let rating = allFood.data().rating
    
    /*
    this is called a spread operator, it takes all the ratings in 
    today food and merges it into all food
    */
    rating = {...rating, ...todaysFood.rating}

    const docRef2 = doc(db,"all food", todaysFood.food +" "+ todaysFood.dininghall)
    //this chnages the rating map in all food to contain the updated map in today food
    setDoc(docRef2, {        
      rating: rating
    }, {merge: true})
  } 
  else {
    //if the document does not exist create a new one in all food
    const docRef2 = doc(db,"all food", todaysFood.food +" "+ todaysFood.dininghall)
    setDoc(docRef2, {     
      food: todaysFood.food, 
      dininghall: todaysFood.dininghall,
      type: todaysFood.type,
      rating: todaysFood.rating
    }, {merge: true})
  }

  //deletes all the documents in 'today food' 
  await deleteDoc(doc(db, "today food", todaysFood.food +" "+ todaysFood.dininghall))
}

console.log("START SCRAPING")
/**
 * this section scrapes all the food items from each dining hall of the brown
 * dining menu 
 */

const diningHalls = [{name: "Andrews", website: "https://dining.brown.edu/cafe/andrews-commons/"},{name: "Verney-Woolley", website: "https://dining.brown.edu/cafe/verney-woolley/"}, {name: "Sharpe Refectory", website: "https://dining.brown.edu/cafe/sharpe-refectory/"}]

 for (let i = 0; i < diningHalls.length; i++) {
    const URL = diningHalls[i].website
    const diningHall = diningHalls[i].name

    const $ = cheerio.load(await getRawData(URL));
    
    const names = $(".site-panel__daypart-item-title").toArray().map(el => el.children[0].data.replaceAll("\n", "").replaceAll("\t", "").replaceAll("/","-"))
   
    console.log("START ADDING TO ALL FOODS", diningHall)

    /**
     * This section adds all the newly scraped data to 'all food' if it does 
     * not exist
     */

    names.forEach(async name => {

      //

      const docRef = doc(db, 'all food', name + " " + diningHall);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        setDoc(docRef, {
          food: name, 
          dininghall: diningHall,
          type: "brek1",
          rating: {}
        }, { merge: true });
      }
    })
      
      //
     
    
    console.log("START ADDING TO TODAYS FOODS", diningHall)
    /**
     * this adds all the current foods that appear today 
     */

    names.forEach(async name => {
      const docRef123 = collection(db,"all food")
      const q = query(docRef123, where("food", "==", name),where("dininghall", "==", diningHall));
      
      const quer = await getDocs(q);
      //console.log(quer)
            
      const docRef2 = doc(db,"today food", name + " "+ diningHall)
      //this makes sure that the foods added into today food grab the correct stored data from the all food collection
      quer.docs.forEach((doc) => {
        const data = doc.data()
        setDoc(docRef2, {
          food: data.food, 
          dininghall: data.dininghall,
          rating: data.rating,
          type: data.type
        });
      });
    })
  }


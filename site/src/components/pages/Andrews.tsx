import React, {useState, Dispatch, SetStateAction, useEffect} from 'react';

import '../styles/Pages.css'
import {MyMenu} from './Menu'
import { initializeApp } from "firebase/app";
import {firebaseConfig} from '../../firebase'
import { doc, getFirestore, setDoc,collection, where, getDoc, query, queryEqual, getDocs, deleteDoc } from "firebase/firestore"; 
//import MyMenu from './Menu'


// Accesilibity Labels
export const TEXT_diningHeader_accessible_name  = 'Andrews'


// Global Variables
  let FoodList: string[][] = [[]]
  let FoodMap: Map<String, String[]> = new Map();
  
/**
 * function that pulls Andrews specific meals that were webscraped from firebase and updates foodlist and foodmap
 */
  async function populateFoodList(){
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app)
      const docRef123 = collection(db,"today food")
      const q = query(docRef123, where("dininghall", "==", 'Andrews'));
      const docRef = doc(db, 'today food', 'Cheese Pizza Andrews');
      console.log("Read at 28------------------andrews")
      const docSnap = await getDoc(docRef);
      
    // updates food list 
    console.log('console.log("Read at 21------------------andrews")')
      const food= await getDocs(q).then(r => r.docs.forEach((doc) => {
          const data = doc.data()
          if (!FoodMap.has(data.food)){
              FoodMap.set(data.food,['rating'])
              FoodList.push([data.food, '0'])
          }
      }))
   }
  
  /**
   * runs the main method of this class (populateFoodList) that updates food list for Andrews
   * @returns the html of the Andrews page. This html also contains an updated version of the food list
   */
export function Andrews() {
    const [foods, setFoods] = useState<string[][]>([]);

    async function loadFoods(){
        await populateFoodList()
        setFoods(FoodList)
    }


        console.log("getting menu")
        loadFoods()   


    return (
        <div className ={"background"}>
            <div className={'background-box'}>
                <h1 aria-label = {TEXT_diningHeader_accessible_name}>Andrews</h1>
                <MyMenu myFoods={FoodList} diningHall = {"Andrews"}/>               
            </div>
        </div>

    )
}

export default Andrews;



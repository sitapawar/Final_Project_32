import React, {useState, Dispatch, SetStateAction, useEffect} from 'react';
import '../styles/Pages.css'
import {MyMenu} from './Menu'
import {firebaseConfig} from '../../firebase'
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc,collection, where, getDoc, query, queryEqual, getDocs, deleteDoc } from "firebase/firestore"; 

// Accessibility Labels
export const TEXT_diningHeader_accessible_name  = 'VDub'

// Global Variables
  let FoodList: string[][] = [[]]
  let FoodMap: Map<String, String[]> = new Map();

/**
 * function that pulls Verney-Woolley specific meals that were webscraped from firebase and updates foodlist and foodmap
 */
async function populateFoodList(){
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)
    const docRef123 = collection(db,"today food")
    const q = query(docRef123, where("dininghall", "==", "Verney-Woolley"));
    const docRef = doc(db, 'today food', 'Cheese Pizza Andrews');
    const docSnap = await getDoc(docRef);
    // updates food list with pulled data
    const food= await getDocs(q).then(r => r.docs.forEach((doc) => {
        const data = doc.data()
        if (!FoodMap.has(data.food)){
            FoodMap.set(data.food,[])
            FoodList.push([data.food, '0'])
        }
    }))
 }

/**
   * runs the main method of this class (populateFoodList) that updates food list for Verney-Woolley
   * @returns the html of the Verney-Woolley page. This html also contains an updated version of the food list
   */
 export function Vdub() {
    const [foods, setFoods] = useState<string[][]>([]);

    async function loadFoods(){
        await populateFoodList()
        setFoods(FoodList)
    }


        loadFoods()   


    return (
        <div className ={"background"}>
            <div className={'background-box'}>
                <h1 aria-label = {TEXT_diningHeader_accessible_name}>Vdub</h1>
                <MyMenu myFoods={FoodList} diningHall = {"Verney-Woolley"}/>               
            </div>
        </div>

    )
}

export default Vdub;
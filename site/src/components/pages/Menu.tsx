import React, {useState, Dispatch, SetStateAction, useEffect} from 'react';
import '../styles/Pages.css'
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc,collection, where, getDoc, query, queryEqual, getDocs, deleteDoc, updateDoc} from "firebase/firestore"; 
import {firebaseConfig} from '../../firebase'


//Accessibility Labels and Global Variables 
export const TEXT_inputRating_accessible_name = 'Rating Input'
export const TEXT_submit_button_accessible_name = 'Submit Your Rating'
export const TEXT_submit_button_text =  'Submit Your Rating'
export const TEXT_ratingText_accessible_name = 'FOOD_RATING_VALUE'
export var FoodMap: Map<String, String[]> = new Map();

// Rating Input interface
interface ControlledInputProps {
    input: string, 
    setValue: Dispatch<SetStateAction<string>> 
    ariaLabel: string 
  }

/**
   * Function that takes in an input
   * @returns an instance of ControlledInputProps
   */
function ControlledInput({input: value, setValue, ariaLabel}: ControlledInputProps) {
    return (
      <input value = {value} 
             onChange={(ev) => setValue(ev.target.value)}
             aria-label={ariaLabel}
             ></input>
    );
  }

  
 /**
   * Function for Assigning unique ids to store ratings and date of
   * @returns a unique string
   */
  function genUniqueId(): string {
    const dateStr = Date
      .now()
      .toString(36); // convert num to base 36 and stringify
  
    const randomStr = Math
      .random()
      .toString(36)
      .substring(2, 8); // start at index 2 to skip decimal point
  
    return `${dateStr}-${randomStr}`;
  }

  /**
   * Asynch Function that updates the firebase rating for an item 
   * @params foodItem - string name of food, newRating - string rating, diningHall - string name 
   */
  async function updateItem(foodItem: string, newRating : string, diningHall : string){
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)
    const docRef = doc(db,"today food",foodItem + " " + diningHall)

    //this unique id allows user privacy// also also us to set up google auth at a later date with no issues
    var numID = genUniqueId();
   const docSnap = await getDoc(docRef);
   console.log("Read at 63--------------------")
   
   if (docSnap.exists()) {
     //defensive programming because we are using a copy of the dictionary
     var mydict= docSnap.data().rating
     mydict[numID] = newRating
     
     console.log(mydict[0])
     console.log("Read at 73--------------------")
     setDoc(docRef, {
      food: docSnap.data().food, 
      dininghall: docSnap.data().dininghall,
      rating: mydict,
      type: docSnap.data().type
   }, { merge: true });
   
  }
  else{
    console.log("unsuccessful push to firebase")
  }
   
}
  
var myMap = new Map()
/**
 * PrintedMenu makes a box with the foodName, average rating and an input box to input your own rating
 * @param input : string with the name of the food
 * @param diningHall : string with the name of the dininghall
 * @returns a box with the info for that food item
 */
export function PrintedMenu( {input, diningHall}: {input: string[], diningHall : string}) {
    const [myInput, setMyInput] = useState<string>('');
    const [foodName, setFoodName] = useState<string>(input[0]);
    const [foodRating, setRating] = useState<number|string>(0);

  
    
    var avRat=0
    async function pullRating(){
        let RatingMap:Map<string, string> = await getDict(foodName, diningHall)
        avRat = getAverageRating(RatingMap, false)
        if (isNaN(avRat)) {
            console.log('No rating found')
            setRating('unrated')
        }else{
            setRating(avRat)
            // console.log("this is the real average as a string  "+ avRat.toString())
        }
    }
    pullRating(); 


    let myRat = ""
    // console.log("this is the real average as a string  "+ avRat.toString())
    if(myMap.has(input[0])){
      myRat = myMap.get(input[0])
    }
    return (
<div className={"foodBox"}>
        <div className = {"foodText"} aria-label={input[0]}>
            <p><b>{foodName}</b></p>
        </div>
        <div className = {"rating"} aria-label={TEXT_ratingText_accessible_name}>    
            <p>Average Rating: {foodRating}</p>
            <p className = {"inputRatingText"}>Your Rating: {myRat}</p> 
            <ControlledInput input={myInput} setValue={setMyInput} ariaLabel={TEXT_inputRating_accessible_name}/>    
        <div>
          <button onClick={() => {  
              if(myInput == "1" ||myInput == "2"||myInput == "3"||myInput == "4"||myInput == "5"||myInput == "0") {
                FoodMap.set(input[0], [myInput]) //this doesn't work actually but ughhhh
                // currRating.set(input[0],Number(myInput))
                myMap.set(input[0],myInput)
                setRating(Number(myInput))
              //  console.log(FoodMap)
                updateItem(input[0], myInput, diningHall)

                setMyInput('Response Recorded')
            }
          else{
            setMyInput('Enter integer 0-5')
          }}}
            aria-label={TEXT_submit_button_accessible_name}>
            {TEXT_submit_button_text}
          </button>
        </div>
        <br></br>
      </div>
      </div>
    );
  }

  /**
   * Gets the average rating for the food by summing and dividing the ratings from firebase
   * @param mydict list of all the ratings for that food item
   * @returns average of all those ratings
   */
  export function getAverageRating(mydict: Map<string,string>, tests: boolean){
    if (tests){
      const size = mydict.size
      var sum = 0
      for (let value of mydict.values()) {
        sum+=parseInt(value)
      }
      return Math.round(((sum/size) + Number.EPSILON) * 100) / 100
    }
    const size=Object.values(mydict).length
    console.log("this is the value; "+ size)
    var sum=0;
    //console.log("this is it"+ Object.keys(mydict).length)
    for (let value of Object.values(mydict)) {
      console.log(value);                 
      sum+=parseInt(value)
  }
    console.log("this is the sum; "+ sum)
    console.log("this is the avf; "+ sum/size)
    let myAverage = sum/size
    return Math.round((myAverage + Number.EPSILON) * 100) / 100
  }
  
  /**
   * 
   * @param foodItem 
   * @param diningHall 
   * @returns 
   */
  async function getDict(foodItem: string, diningHall : string){
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)
    
    const docRef = doc(db,"today food",foodItem + " " + diningHall)
 
   const docSnap = await getDoc(docRef);
   console.log("Read at 188--------------------")
   
   if (docSnap.exists()) {
     console.log("Document data:", (docSnap.data().rating));
     //console.log(Object.keys(docSnap.data().rating).length)
     let mydict:Map<string, string>= docSnap.data().rating
     //console.log("this is the dict before rating "+ docSnap.data().rating)
    return mydict
  }
  else{
    console.log("something aint right")
    let myMap = new Map<string, string>([
      ["key1", "1"],
      ["key2", "2"]
  ]);
    return myMap
  }
}
  


 //React was being weird about calling functions in this so I just made a button and console logged stuff 
 //but it's always empty 
 //I'll work on doing it normally later, I just wanted to see if I could get the food list to show up even in the console
export function MyMenu({myFoods, diningHall}: {myFoods: string[][], diningHall : string}) {
      const [foods, setFoods] = useState<string[][]>([]);
      const [FoodList, setFoodList] = useState<string[][]>([[]])

      useEffect(()=> {
            console.log("getting menu")
            setFoodList(myFoods)
            setFoods(myFoods)   
      }, [])

      return (
        <div className={"menuBox"}>
          <div>
              {foods.filter(food => food.length >= 1).map((food,index) =><PrintedMenu input={food} key={index} diningHall = {diningHall}/>)}
          </div>
        </div>
      );  
    }


  

export default MyMenu;
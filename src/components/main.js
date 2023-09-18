
import React , {useEffect, useState} from "react";
import Die from "./die"; // Assuming you have a Die component
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Main() {


  function holddie(currentid){
    const newDiceList = allnewdice.map((obj,index)=>{
      if (currentid === obj.id){
        const modifieddice = {
          value : obj.value,
          isheld : obj.isheld?(false):(true),
          id : currentid
        }
        return modifieddice
      }
      else{
        return obj
      }
    })
    updatedice(newDiceList)
  }

  function generateDieList(){
    const randarr = []
    for (let i=0; i<10; i++){
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      const obj = {
        value : randomNumber,
        isheld : false,
        id: nanoid()

      }
      randarr.push(obj)
    }
    return randarr
  }

  const[allnewdice , updatedice] = useState(generateDieList())

  function GenerateDice() {
    const diceDisplayList = allnewdice.map((obj, index) => {
      return <Die
       value={obj.value} 
       id={obj.id} 
       isheld={obj.isheld} 
       holddie = {holddie} ></Die>
    });
  
    return diceDisplayList;
  }
  

  function newRoll() {
    if (tenzies.value === true){
      updatedice(generateDieList)
      updatetenzies({value : false , display:'Roll'})
    }
    else{
      const updatedDiceList = allnewdice.map((obj, index) => {
        if (obj.isheld === true) {
          return obj;
        } else {
          const newobj = {
            value : Math.floor(Math.random() * (6 - 1 + 1)) + 1,
            isheld : false,
            id: obj.id
          }
          return newobj;
        }
      });
      
      // Use the state setter function to update the state
      updatedice(updatedDiceList);
    }
  }

  const[tenzies , updatetenzies] = useState({
    value: false ,
    display:'Roll',
})

  useEffect(()=>{
    const allheld =  allnewdice.every(die=>die.isheld)
    const gamewon = allnewdice.every(die => (die.value === allnewdice[0].value))
    if (allheld && gamewon){
      updatetenzies({value:true , display:'New Game'})
      console.log('You won')
    }
  }, [allnewdice])
  
  return (
    <div className="main-div">
     {tenzies.value == true && <Confetti/>}
    <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {GenerateDice()}
      </div>
      <button className="main-btn" onClick={()=>newRoll()}>{tenzies.display}</button>
    </div>
  )
}

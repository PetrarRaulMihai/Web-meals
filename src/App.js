import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import Meal from './Meal';

function App() {
  const [value, setInput] = useState(' ');  
  const [mealsArray, setMealsArray] =useState ([]);

  const handleInputValue = (event) => {
    setInput(event.target.value)    
    console.log(value)    
  }

  //fetch on API
  const fetchData = async () => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`);
    const data = await res.json();
    console.log(data.meals);
    setMealsArray(data.meals);
    console.log(mealsArray);
  }

  // this is auto called when open page to immediatlly edisplay meals
  //fetchData() // intreaba iulian

  return (
    <div>      
      <header className="bg text-white flex flex-col text-center items-center py-5 px-4 gap-2 fixed left-0 right-0 top-0 border-orange-800 border-2 z-50 shadow-[0px_2px_8px_4px_#9c4221]">
        {/* <p className='font-bold text-2xl'>Find Meals For Your Ingredients</p> */}
        <p className='text-sm'>Real food doesn't have ingredients, real food is ingredients.</p>
        <p className='text-sm'><i>- Jamie Oliver -</i></p>
        <div className='m-2 flex flex-row h-8'>
          <input onChange={handleInputValue} type='text' placeholder='Search' className='outline-none text-zinc-950 pl-4 rounded-l-2xl'></input>
          <span onClick={fetchData} className='bg-orange-800 flex items-center rounded-r-2xl'><FontAwesomeIcon icon={faMagnifyingGlass} className='px-3 active:opacity-5 transition'/></span>
        </div>        
      </header>
      <div className='mt-56 mx-12 flex flex-wrap 2xl:justify-center 2xl:gap-5 md:gap-1 sm:items-center'>
       {
        mealsArray.map((meal) => {
          return(
            <Meal meal={meal}/>
          )
        })
       }
      </div>
    </div>
  );
}

export default App;

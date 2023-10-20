import { useState, useEffect } from "react";


function Meal ({meal}) {
    const [id, setId] = useState('');
    const [array, setArray] = useState([]); 
    const [stateOf, setStateOf] = useState(false);  

    //this function open/close modal
    const handleState = () => {
        setStateOf(false);
        document.body.classList.remove('disable-scroll')
    }


    // this one is for updating the id value immediatlly after randering
    useEffect(() => {
        if(id){
            fetchData(id)
        }
    },[id])

    const handleModal = () => {
        // here we set state true in order to display modal after fetch data
        setId(meal.idMeal)
        setStateOf(true)
        document.body.classList.add('disable-scroll')
        console.log(id)       
    }   
   
    const fetchData = async (id) => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();       
        setArray(data.meals);        
    }

   

    return(
        <div className="cursor-pointer">
            <div id={meal.idMeal} className="flex flex-col items-center mb-10 rounded-t-3xl rounded-b-3xl backdrop-blur-md shadow-[0px_0px_10px_5px_#9c4221] 2xl:w-96">          
                <img className='rounded-t-3xl' src={meal.strMealThumb} alt={meal.strMeal}></img>            
                <button onClick={handleModal} className="bg-amber-800 text-xl px-7 py-2 rounded-full text-white my-8 hover:bg-amber-700 active:bg-orange-700 transition">Get Recipe</button>
            </div>
            {/* this is the parent container of each meal container and modal container */}
            <div className="flex justify-center 2xl:relative">
                {
                    array.map((meal) =>{
                        return(
                          <>
                              {stateOf && 
                                <div className="fixed top-20 z-50 w-5/6 flex flex-col items-center px-4 gap-1 rounded-xl custom-backdrop-filter shadow-[0px_0px_10px_5px_#9c4221] text-x 2xl:fixed 2xl:w-80 2xl:m-auto 2xl:top-80">
                                    <button onClick={handleState} className="absolute text-xl font-bold right-0 top-0 bg-orange-900 text-white px-2 flex items-center justify-center rounded-bl-xl rounded-tr-xl">X</button>
                                    <div className="font-bold text-center">
                                        <p className="mt-2">{meal.strMeal}</p>
                                        <p>{meal.strArea}</p>
                                        <p>{meal.strCategory}</p>
                                        <p>Instructions</p>
                                    </div>
                                    <textarea className="w-full resize-none h-72 px-3 py-1 text-center bg-color-custom rounded-lg text-base">{meal.strInstructions}</textarea>
                                    <img className='w-1/3 rounded-full my-2' src={meal.strMealThumb}></img>
                                    <a className="mb-3 font-bold" href={meal.strYoutube}>Watch video</a>
                                </div>}
                          </>
                        )
                    } )
                }
            </div>
        </div>
    )
}

export default Meal;
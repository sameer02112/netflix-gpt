import React,{useRef} from 'react'
import openai from '../utils/openai';

const GptSearchBar = () => {
    
    const searchText = useRef(null);

    const handleGptSearchClick = async () => {
        const gptQuery =  `Act as a Movie recommendation system and suggest some movies for the query 
                           ${searchText.current.value}. 
                           Only give a list of 5 movies, comma seperated`; 

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery}],
            model: 'gpt-3.5-turbo',
          });

        //   TODO
    }


    return (
        <div className="pt-[20%] flex justify-center">
            <form className="m-2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
                <input type="text" ref={searchText} className="p-4 m-2 col-span-10" placeholder="What movies are you looking for?"/>
                <button className="py-2 px-12 m-4 bg-red-700 cursor-pointer text-white rounded-lg col-span-2" onClick={handleGptSearchClick}>Search</button>
            </form>
        </div>
    )
}

export default GptSearchBar

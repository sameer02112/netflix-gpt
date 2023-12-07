import React from 'react'
import GptMovieSuggestion from './GptMovieSuggestion'
import GptSearchBar from './GptSearchBar'
import { IMG_BG } from '../utils/constants'

const GptSearch = () => {
    return (
        <div className="">
            <img
                src= {IMG_BG}
                alt="body-image"
                className="absolute -z-10 opacity-80"
                />
            <GptSearchBar/>
            <GptMovieSuggestion />
        </div>
    )
}

export default GptSearch

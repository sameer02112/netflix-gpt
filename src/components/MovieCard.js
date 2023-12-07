import React from 'react'
import { IMG_CDN } from '../utils/constants'

const MovieCard = ({posterPath}) => {
    return (
        <div className="w-48 pr-4 cursor-pointer">
            <img src={IMG_CDN + posterPath}
                 alt="img-poster"/>
        </div>
    )
}

export default MovieCard

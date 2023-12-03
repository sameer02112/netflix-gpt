import React from 'react'

const VideoTitle = ({title,overview}) => {
    return (
        <div className="pt-[20%] px-24 absolute z-10 text-white bg-gradient-to-r from-black w-screen aspect-video">
            <h1 className="text-6xl font-bold">{title}</h1>
            <p className="py-6 text-lg w-1/3">{overview}</p>
            <div className="">
                <button className="bg-white text-black p-4 px-10 text-xl  rounded-lg hover:bg-opacity-80">▶️ Play</button>
                <button className="bg-gray-500 text-white p-4 px-10 text-xl bg-opacity-50 rounded-lg ml-2 hover:bg-opacity-80">More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle

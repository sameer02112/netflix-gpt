import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from 'react';

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getNowPlayingMovies();
    }, [])

    const getNowPlayingMovies = () => {
        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)
        .then(response => response.json())
        .then(response => {
            console.log(response.results);
            dispatch(addNowPlayingMovies(response.results));
        })
        .catch(err => console.error(err));
    }
}

export default useNowPlayingMovies
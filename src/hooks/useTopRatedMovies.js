import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from 'react';

const useTopRatedMovies = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getTopRatedMovies();
    }, [])

    const getTopRatedMovies = () => {
        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS)
        .then(response => response.json())
        .then(response => {
            dispatch(addTopRatedMovies(response.results));
        })
        .catch(err => console.error(err));
    }
}

export default useTopRatedMovies
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from 'react';

const usePopularMovies = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getPopularMovies();
    }, [])

    const getPopularMovies = () => {
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS)
        .then(response => response.json())
        .then(response => {
            dispatch(addPopularMovies(response.results));
        })
        .catch(err => console.error(err));
    }
}

export default usePopularMovies
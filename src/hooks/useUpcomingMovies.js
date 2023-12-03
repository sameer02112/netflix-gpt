import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from 'react';

const useUpcomingMovies = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getUpcomingMovies();
    }, [])

    const getUpcomingMovies = () => {
        fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS)
        .then(response => response.json())
        .then(response => {
            dispatch(addUpcomingMovies(response.results));
        })
        .catch(err => console.error(err));
    }
}

export default useUpcomingMovies
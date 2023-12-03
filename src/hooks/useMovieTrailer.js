import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo } from '../utils/moviesSlice';
import { useEffect } from 'react';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        getMovieVideos();
    }, [])

    const getMovieVideos = () => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)
        .then(response => response.json())
        .then(response => {
            const filterData = response.results.filter(el => el.type == "Trailer");
            const trailer = filterData.length ? filterData[0] : response.results[0];
            dispatch(addTrailerVideo(trailer))
        })
        .catch(err => console.error(err));
    } 
}
export default useMovieTrailer
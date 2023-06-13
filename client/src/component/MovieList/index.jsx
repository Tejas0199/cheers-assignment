import { useEffect, useState } from 'react';
import './style.css'

const MovieList = () => {
	const [list,setList] = useState(null);
	const getMovieData = async () => {
		const response = await fetch('http://127.0.0.8:4050/movies');
		const data = await response.json();
		console.log(data);
		setList(data);
	}
	useEffect(() => {
		getMovieData()
	},[])
	return <div className='movie-container'>
		{ list ? <>
		{
			list?.map((movie,index) => {
				return <div className='movie-card' key={index}>
					<img src={movie.Poster} alt="" />
					<h4>{movie.Title}<span>{movie.Year}</span></h4>
					<p>Rating :- {movie.Rating}</p>
				</div>
			})
		}
		</> : <h6>Loading</h6>}
	</div>
}

export default MovieList;
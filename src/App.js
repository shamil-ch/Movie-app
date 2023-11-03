import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from "./components/movielist";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";


const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [SearchValue, setSearchValue] = useState('');

const getMovieRequest = async (SearchValue) => {
  const url = `http://www.omdbapi.com/?s=${SearchValue}&apikey=8f0198ab`

  const response = await fetch(url);
  const responsejson = await response.json();

  if (responsejson.Search) {
    setMovies(responsejson.Search);
  }
 
};

useEffect(()=> {
getMovieRequest(SearchValue);
}, [SearchValue]);

useEffect(() => {
  const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
  setFavourites(movieFavourites);

}, []);

const saveToLocalStorage = (items) => {
  localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
};

const addFavouriteMovie = (movie) => {
const newFavouriteList = [...favourites, movie]
setFavourites(newFavouriteList);
saveToLocalStorage(newFavouriteList);
}

const RemoveFavouriteMovie = (movie) => {
const newFavouriteList = favourites.filter((favourite)=> favourite.imdbID !== movie.imdbID);
setFavourites(newFavouriteList);
saveToLocalStorage(newFavouriteList);
}

  return (
  <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading="Movies"/>
      <SearchBox SearchValue={SearchValue} setSearchValue={setSearchValue}/>

    </div>
    <div className='row'>
    <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourite}/>
    </div>
    <div className="row d-flex align-items-center mt-4 mb-4">
      <MovieListHeading heading="Favourites"/>
      </div>
      
    <div className='row'>
    <MovieList 
    movies={favourites} 
    handleFavouritesClick={RemoveFavouriteMovie}
    favouriteComponent={RemoveFavourites}
    />
    </div>
   

  </div>
  );
};

export default App;
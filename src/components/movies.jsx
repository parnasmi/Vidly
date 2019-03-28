import React, { Component } from 'react';
// import { getMovies, deleteMovie } from '../services/fakeMovieService'
import { getMovies, deleteMovie } from "../services/movieService";
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
// import {getGenres} from '../services/fakeGenreService';
import { getGenres } from '../services/genreService';
import ListGroup from './common/listGroup';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import SearchBox from './common/searchBox';
import { toast } from 'react-toastify';

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null
  };

  async componentDidMount() {
		const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
		
		const {data: movies} = await getMovies();
		
    this.setState({
      movies,
      genres
		});
		
  }

  handleRemove = async id => {
		const originalMovies = this.state.movies;
		console.log(originalMovies, 'till removing');
		const movies = this.state.movies.filter(movie => movie._id !== id);

    this.setState({
      movies
		});
		
		try {
			await deleteMovie(id);
			console.log(id, 'movie id');
			console.log(this.state.movies, 'after removing');
		} catch(ex) {
			if(ex.response && ex.response.status === 404) {
				toast.error('This movie has been deleted');
			}
			
			this.setState({
				movies: originalMovies
			});
		}
		
		
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;

    this.setState({
      movies
    });
  };

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  handleGenresSelect = genre => {
		this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn, searchQuery: "" });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
			selectedGenre: null,
			currentPage: 1
    });
  };

  getPagedMovies = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
		} else if (selectedGenre && selectedGenre._id )
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      genres,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    // if (count === 0) return <p>There are no movies in the database</p>;
    const { totalCount, data: movies } = this.getPagedMovies();

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenresSelect}
            />
          </div>
          <div className="col-9">
            <Link className="btn btn-primary mb-2" to="/movie/new">
              New Movie
            </Link>
            <h3>There are {totalCount} movies in the database</h3>
            <SearchBox value={searchQuery} onSearchChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleRemove}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}



export default Movies;
import React, { Component } from "react";
import Like from "./common/like";
import PropTypes from "prop-types";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title", content: movie => <Link to={`/movie/${movie._id}`}>{movie.title}</Link> },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      content: movie => <Like isLiked={movie.like} onClick={() => this.props.onLike(movie)} />
    },
    {
      key: "delete",
      content: movie => (
        <button
          className="btn btn-danger"
          onClick={() => {
            this.props.onDelete(movie._id);
          }}
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table data={movies} onSort={onSort} sortColumn={sortColumn} columns={this.columns}/>
    );
  }
}

MoviesTable.propTypes = {
  movies: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default MoviesTable;

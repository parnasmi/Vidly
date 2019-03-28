import React from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";

const Pagination = (props) => {
	const {itemsCount, pageSize, currentPage, onPageChange} = props;
	const pageCount = Math.ceil(itemsCount / pageSize);
	const pages = _.range(1, pageCount + 1);
	
	if (pageCount === 1) return null;
    return (
      <nav>
        <ul className="pagination">
          {pages.map(page => (
						<li key={page}
							className={(currentPage === page) ? "page-item active" : "page-item"}
								onClick={() => onPageChange(page)}>
              <button className="page-link">
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
}

Pagination.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
}
 
export default Pagination;
import React from 'react';

const SearchBox = ({value, onSearchChange}) => {
	return ( 
		<input type="search" 
						name="query"
						placeholder="Search"
						className="form-control my-3"
						value={value}
						onChange={e => onSearchChange(e.currentTarget.value)} 
		/>
	);
}
 
export default SearchBox;
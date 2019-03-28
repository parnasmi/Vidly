import React from 'react';

const Like = (props) => {
	let classes = "fa fa-heart";
	classes += props.isLiked ? '' : '-o';
	return (
		<i
			className={classes}
			style={{ cursor: "pointer" }}
			aria-hidden="true"
			onClick={props.onClick}
		/>
	);
}
 
export default Like;
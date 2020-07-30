import React from 'react';
import './SearchBlock.css'

const SearchBlock = (props) => {

    const searchText = 'Search';
    const {onSearchChange} = props;
    
    return (
        <div className="SearchBlock">
            <input 
                className="form-control" 
                onChange={(event)=>onSearchChange(event.target.value)}
                placeholder = {searchText}
            />
        </div>);
}

export default SearchBlock;
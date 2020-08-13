import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const Search = ({ searchVideos }) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        searchVideos('');
        // eslint-disable-next-line
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title === '') {
            return;
        }

        const query = title;
        searchVideos(query);
    };

    return (
        <Paper component="form" className="search" onSubmit={handleSubmit} style={{ margin: '10px' }} data-tour="first-step">
            <InputBase
                className="input"
                placeholder="Busca un video"
                inputProps={{ 'aria-label': 'search youtube video' }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <IconButton
                type="submit"
                className="iconButton"
                aria-label="search"
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default Search;

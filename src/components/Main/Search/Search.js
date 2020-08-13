import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const Search = ({ searchVideos }) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        searchVideos('');
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

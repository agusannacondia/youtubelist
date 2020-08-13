import React, { useReducer } from 'react';
import VideosContext from './VideosContext';
import VideosReducer from './VideosReducer';
import { GET_VIDEOS } from '../../types';

import clienteAxios from '../../config/axios.js';

const VideosState = (props) => {
    const initialState = {
        videos: [],
        hola: null
    };

    const [state, dispatch] = useReducer(VideosReducer, initialState);

    const getVideos = async (query) => {
        try {
            const data = await clienteAxios.get(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${process.env.REACT_APP_API_KEY}`
            );
            const videos = obtenerVideos(data);
            dispatch({
                type: GET_VIDEOS,
                payload: videos
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <VideosContext.Provider
            value={{
                videos: state.videos,
                getVideos
            }}
        >
            {props.children}
        </VideosContext.Provider>
    );
};

export default VideosState;

const obtenerVideos = (data) => {

    const videos = [];

    if(data && data.data && data.data.items) {
        data.data.items.forEach((item) => {
            const video = {
                img: item.snippet.thumbnails.high.url,
                title: item.snippet.title,
                author: item.snippet.channelTitle,
                id: item.id.videoId,
                fecha: item.snippet.publishTime,
            }
            videos.push(video);
        })
    }
    
    return videos;
}
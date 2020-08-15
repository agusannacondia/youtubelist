import React, { useReducer } from 'react';
import VideosContext from './VideosContext';
import VideosReducer from './VideosReducer';
import { GET_VIDEOS } from '../../types';
import { key } from '../../config/axios.js';
import { clienteAxios }  from '../../config/axios.js';

const VideosState = (props) => {
    const initialState = {
        videos: [],
        hola: null
    };

    const [state, dispatch] = useReducer(VideosReducer, initialState);

    const getVideos = async (query) => {
        try {
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${key}`; 
            console.log(url);
            const data = await clienteAxios.get(
                url
            );
            const videos = obtenerVideos(data);
            dispatch({
                type: GET_VIDEOS,
                payload: videos
            });
        } catch (error) {
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
import React, { useEffect, useContext, useState } from 'react';
import Search from './Search/Search';
import Gallery from './Gallery/Gallery';
import VideosContext from '../../context/videos/VideosContext';
import DragAndDrop from './DragAndDrop/DragAndDrop';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { DragDropContext } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faTrashAlt,
    faRandom
} from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';
import Nav from '../Nav/Nav';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

function shuffleArray(array) {
    var firstArray = array[0];
    var copy = [].concat(array);
    copy.sort(function () {
        return 0.5 - Math.random();
    });
    var firstCopy = copy[0];
    var rta = copy.map((item) => {
        return item !== firstArray ? item : firstCopy;
    });
    rta[0] = firstArray;
    return rta;
}

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const Main = ({showTour}) => {
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([]);
    const [actualVideo, setActualVideo] = useState('');

    const getList = (id) => {
        return id === 'droppable' ? items : selected;
    };

    const videosContext = useContext(VideosContext);
    const { videos, getVideos } = videosContext;

    const [videosState, setVideosState] = useState([]);

    useEffect(() => {
        setItems(videos);
    }, [videos]);

    const searchVideos = async (query) => {
        const data = await getVideos(query);
        setVideosState(data);
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === 'droppable') {
                const result = reorder(
                    getList(source.droppableId),
                    source.index,
                    destination.index
                );

                setItems(result);
                return;
            }
            const result = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            setSelected(result);
            setActualVideo(result[0].id);
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            setItems(result.droppable);
            setSelected(result.droppable2);
            setActualVideo(result.droppable2[0].id);
        }
    };

    const clear = () => {
        setSelected([]);
        setActualVideo('');
    };

    const shuffle = () => {
        var rta = shuffleArray(selected);
        setSelected(rta);
        setActualVideo(rta[0].id);
    };

    const endVideo = () => {
        var newSelected = selected.slice(1, selected.length);
        setSelected(newSelected);
        setActualVideo(newSelected.length > 0 ? newSelected[0].id : '');
    };

    return (
        <div>
            <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Container fluid>
                        <Row>
                            <Col
                                xs={12}
                                md={8}
                                lg={8}
                                xl={8}
                                style={{
                                    paddingRight: '0px',
                                    paddingLeft: '0px'
                                }}
                            >
                                <Nav showTour={showTour}/>
                                <Search searchVideos={searchVideos} />
                                <Alert
                                    variant="dark"
                                    style={{
                                        margin: '0px',
                                        textAlign: 'center',
                                        backgroundColor: '#3A3D4D',
                                        color: '#FFFFFF',
                                        border: '0px'
                                    }}
                                >
                                    <strong>RESULTADOS</strong>
                                </Alert>
                                <Gallery
                                    reorder={reorder}
                                    move={move}
                                    videos={items}
                                />
                            </Col>
                            <Col xs={0} md={4} lg={4} xl={4}>
                                <div data-tour="third-step">
                                    {actualVideo !== '' && (
                                        <ReactPlayer
                                            url={`https://www.youtube.com/watch?v=${actualVideo}`}
                                            width={'100%'}
                                            height={'260px'}
                                            controls={true}
                                            onEnded={endVideo}
                                        />
                                    )}

                                    <Alert
                                        variant="warning"
                                        style={{
                                            margin: '0px',
                                            textAlign: 'center',
                                            backgroundColor: '#3A3D4D',
                                            color: '#FFFFFF',
                                            border: '0px'
                                        }}
                                    >
                                        <strong>PLAYLIST</strong>
                                    </Alert>
                                    <ButtonGroup
                                        style={{
                                            width: '100%'
                                        }}
                                    >
                                        <Button
                                            variant="secondary"
                                            onClick={clear}
                                            style={{
                                                borderRadius:
                                                    '15px 0px 0px 15px'
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrashAlt}
                                            />
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            onClick={shuffle}
                                            style={{
                                                borderRadius:
                                                    '0px 15px 15px 0px'
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faRandom} />
                                        </Button>
                                    </ButtonGroup>
                                    <DragAndDrop
                                        isVisible={videos && videos.length > 0}
                                        selected={selected}
                                        reorder={reorder}
                                        move={move}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </DragDropContext>
            </div>
        </div>
    );
};

export default Main;

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import GalleryItem from './GalleryItem/GalleryItem';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

const Gallery = ({ videos, reorder, move }) => {
    useEffect(() => {}, [videos]);

    return (
        <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <div ref={provided.innerRef} data-tour="second-step">
                    {videos.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                        >
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Card style={{ borderRadius: '30px', backgroundColor: '#E05858', borderColor: '1px solid #E05858',  margin: '10px' }} className="individualCard">
                                        <Row
                                            style={{
                                                width: '100%',
                                                margin: 'auto'
                                            }}
                                        >
                                            <Col
                                                xs={5}
                                                sm={5}
                                                md={5}
                                                lg={5}
                                                xl={5}
                                                style={{ margin: 'auto' }}
                                            >
                                                <Card.Img
                                                    src={item.img}
                                                    alt={item.title}
                                                    style={{ borderRadius: '30px', border: '3px solid #E05858'}}
                                                />
                                            </Col>
                                            <Col>
                                                <Card.Body>
                                                    <Card.Title style={{ color: 'white' }}>
                                                        {item.title}
                                                    </Card.Title>
                                                    <Card.Text style={{ color: 'white' }}>
                                                        {item.author}
                                                    </Card.Text>
                                                    <Card.Text style={{ color: 'white', position: 'absolute', bottom: '20px' }}>
                                                        {obtenerFecha(item.fecha)}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Gallery;

const obtenerFecha = (fecha) => {
    var fecha1 = moment(fecha);
    var fecha2 = moment();

    var dias = fecha2.diff(fecha1, 'days');

    var rta = "";

    if(dias >= 365){
        rta = "hace " + Math.floor(dias/365) + ( Math.floor(dias/365) > 1 ? " años" : " año");
    } else if (dias >= 30) {
        rta = "hace " + Math.floor(dias/30) + ( Math.floor(dias/30) > 1 ? " meses" : " mes");
    } else if (dias >= 7) {
        rta = "hace " + Math.floor(dias/7) + ( Math.floor(dias/7) > 1 ? " semanas" : " semana");
    } else if (dias >= 1) {
        rta = "hace " + dias + ( dias > 1 ? " días" : " día");
    } else {
        rta = "hoy";
    }

    return rta;
}

/*
<div className="root">
            <GridList className="gridList">
                {videos.map((video, index) => {
                    return (
                            <GridListTile key={video.img} onClick={() => 1}>
                                <img src={video.img} alt={video.title} />
                                <GridListTileBar
                                    title={<strong>{video.title}</strong>}
                                    subtitle={video.author}
                                />
                            </GridListTile>
                    );
                })}
            </GridList>
        </div>
*/

import React, {  useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DragAndDrop = ({ selected, reorder, move }) => {
    useEffect(() => {
        console.log(selected);
    }, [selected]);

    if (!selected || selected.length === 0)
        return (
            <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef}>
                        <Card style={{ borderRadius: '15px', backgroundColor: '#FFFFFF', margin: '5px' }} className="individualCard">
                            <Card.Body>
                                <Card.Text style={{ color: '#2D2F3D' }}>
                                    No hay videos en la lista.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </Droppable>
        );

    return (
        <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                    {selected.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Card style={{ borderRadius: '15px', backgroundColor: index === 0 ? '#519872' : '#FFFFFF', margin: '5px' }} className="individualCard">
                                        <Row style={{width: '100%', margin: 'auto'}}>
                                            <Col
                                                xs={3}
                                                sm={3}
                                                md={3}
                                                lg={3}
                                                xl={3}
                                                style={{ margin: 'auto' }}
                                            >
                                                <Card.Img
                                                    src={item.img}
                                                    style={{
                                                        display: 'block',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto'
                                                    }}
                                                />
                                            </Col>
                                            <Col>
                                                <Card.Body>
                                                    <Card.Text style={{ color: index === 0 ? '#FFFFFF' : '#2D2F3D' }}>
                                                        {substring(
                                                            item.title,
                                                            25
                                                        )}
                                                    </Card.Text>
                                                    <Card.Title style={{ color: index === 0 ? '#FFFFFF' : '#2D2F3D' }}>
                                                        {substring(
                                                            item.author,
                                                            15
                                                        )}
                                                    </Card.Title>
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

const substring = (string, length) => {
    return string.length > length
        ? string.substring(0, length) + '...'
        : string;
};

export default DragAndDrop;

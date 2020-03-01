import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HuralSelect  from '~/components/huralSelect';
import { Col, Button } from 'react-bootstrap';


export default function DayEvents(props) {

    const [changedEvents, setChangedEvents] = useState([]);
    const [blockedEvents, setBlockedEvents] = useState([]);
    const [newEvent, setNewEvent] = useState([]);

    const addToEdit = (id)=>{
        const event = props.events.find(item=>item.id==id)
        setChangedEvents([
                ...changedEvents,
                {...event}
        ])
    }

    const cancelEdit = (id)=>{
        if(id=='new'){
            setNewEvent([]);
        }else{
            setChangedEvents(
                changedEvents.filter(item => item.id != id)
            )
        }
    }

    const isEventEdit = (id)=>{
        return changedEvents.some(item => item.id == id)
    }

    const isEventBlocked = (id)=>{
        return Boolean(blockedEvents.indexOf(id) + 1)
    }

    const changeEventField = (id, field, val)=>{
        const presEvent = changedEvents.find(item => item.id == id);
        setChangedEvents([
            ...changedEvents.filter(item=>item.id!=id),
            { 
                ...presEvent,
                [field]: val
            }
        ]);
    }

    const sendEnevtData = (id, param)=>{
        setBlockedEvents([
            ...blockedEvents,
            id
        ]);

        let paramToSend = { 
            ...param,
            events: {...param.events}            
         };
        if (id == 'new'){
            delete paramToSend.events.id;
        }

        props.changeDay(paramToSend)
        .then(()=>{
            setBlockedEvents(
                blockedEvents.filter(item => { item.id != id } )
            );
            cancelEdit(id);
            if (id == 'new') {
                setNewEvent([]);
            }
        });

    }

    const saveEvent = (id)=>{
        const param = {
            events: changedEvents.find(item => item.id == id),
        }
        sendEnevtData(id, param);

   }

    const deleteEvent = (id)=>{
        setBlockedEvents([
            ...blockedEvents,
            id
        ]);

        props.deleteEvent(id).then(() => {
            setBlockedEvents(
                blockedEvents.filter(item => { item.id != id })
            );
            cancelEdit(id);
        });
    }

    const makeNewEvent = ()=>{

        const newEvntObj = {
            id: "new",
            begin_time: '',
            end_time: '',
            title: '',
            description: '',
            article_link: '',
            moonday: '',
            ritual_id: ''
        };

        setNewEvent([newEvntObj]);

        setChangedEvents([
            ...changedEvents,
            newEvntObj
        ])

    }

    const fields = [
        {
            id:'title',
            name:'Название',
            handler: ''
        },
        {
            id:'begin_time',
            name:'Начало',
            handler: ''
        },
        {
            id:'end_time',
            name:'окончание',
            handler: ''
        },
        {
            id:'description',
            name:'Описание',
            handler: (val, disabled, presEvent, field) => { return(
                <textarea 
                    className="form-control" 
                    value={val} 
                    onChange={(e) => { changeEventField(presEvent.id, field.id, e.target.value) }}
                    disabled={disabled}
                ></textarea>)}
        },
        {
            id:'ritual_id',
            name:'ритуал',
            handler: (val, disabled, presEvent, field) => {return(
                 <HuralSelect
                    hurals={props.rituals}
                    changeHural={(e) => { changeEventField(presEvent.id, field.id, e.target.value) }}
                    selectedId={val}
                    disabled={disabled}
                />)}
        },
        {
            id: 'article_link',
            name: 'ссылка',
            handler: ''
        },
    ]

    const getEditFields = (event, field, disabled)=>{

        let presEvent = event;
        if (isEventEdit(event.id)){
            presEvent = changedEvents.find(item=>item.id==event.id)
        };

        return(
            <div key={field.id} className="form-group row ">
                <label className="col-sm-3 col-form-label">
                    {field.name}
                </label>
                <div className="col-sm-9">
                    {
                        field.handler ? 
                            field.handler(presEvent[field.id], disabled, presEvent, field) :
                        <input
                            className="form-control"
                                value={presEvent[field.id] || ''}
                                onChange={(e) => { changeEventField(presEvent.id, field.id, e.target.value)}}
                            disabled={disabled}
                        />
                    }
                </div>
            </div>
        )
    }

    return (
        <Col md={6}>
            <p className="h2 mt-3 mb-3">
                Дополнительные события
            </p>

            {[
                ...props.events,
                ...newEvent
            ].map(event=>{ 
                const isEdit = isEventEdit(event.id);
                const isBlocked = isEventBlocked(event.id);
                return (
                <form key={event.id}>
                    <div className="bg-light rounded border mt-3 p-3 ">
                            <p className='h3 d-flex justify-content-between '>
                            {event.title}
                            {
                                (isEdit || isBlocked) ||
                                <Button
                                    type="button"
                                    onClick={addToEdit.bind(this, event.id)}
                                >
                                    Редактировать
                                </Button>
                            }
                        </p>
                        {
                            fields.map(field=>{
                                return getEditFields(event, field, (!isEdit || isBlocked) )
                            })
                        }
                        {
                            (!isEdit || isBlocked) ||
                            <>
                                {
                                (event.id == 'new') ||
                                <Button
                                    type="button"
                                    variant="danger"
                                    onClick={deleteEvent.bind(this, event.id)}
                                    className="mr-2"
                                >
                                    Удалить
                                </Button>
                                }
                               <Button 
                                    type="button" 
                                    variant="secondary"
                                    onClick={cancelEdit.bind(this, event.id)}
                                    className="mr-2"
                                >
                                    Отменить
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="success"
                                    onClick={saveEvent.bind(this, event.id)}
                                >
                                    Сохранить
                                </Button>
                            </>
                        }

                    </div>
                </form>   
            )})}

            {
                Boolean(newEvent.length) ||
                <p className="mt-3">
                    <Button
                        onClick={makeNewEvent}
                    >
                        Добавить
                    </Button>
                </p>
            }
        </Col>
    );
}

DayEvents.propTypes = {
    events: PropTypes.array,
    hurals: PropTypes.array,
    blockedEvents: PropTypes.array
};

DayEvents.defaultProps = {
    events: [],
    hurals: [],
    blockedEvents: []
};
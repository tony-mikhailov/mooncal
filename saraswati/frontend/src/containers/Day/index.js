import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import getDateFromURL from '~/api/helpers/getDate';
import {getDateData} from  '~/api/getData.js'
import { postDateData } from '~/api/postData';
import style from './day.module.css'


export default function Day(props) {

    const [dataFields, setDataFields] = useState({ 
        moon_day_no:0 ,
        good_for_haircutself: false,
        good_for_travel: false,
        tersuud: false

    });
    const [disabledFields, setDisabledFields] = useState([]);

    const date = getDateFromURL(props.match.params);

    const changeDay = (param)=>{
        postDateData(date, param)
    }

    const changeMoonDay = (delta)=>{
        changeDay({ moon_day_no: dataFields.moon_day_no + delta })
    }

    useEffect(() => {
        getDateData(date)
            .then(result=>{
                setDataFields(result);
            })
        
    },[]);

    return (
        <Container>
            <Row className="mt-3 d-flex align-items-center">
                <Link 
                    to={`/${date.dayPrev.year}/${date.dayPrev.month}/${date.dayPrev.day}`} 
                    className='btn btn-primary mr-1'
                > 
                {'<'}
                </Link>
                {date.day} <Link to={`/${date.year}/${date.month}`} className='ml-1'>{date.monthWord} {date.year} </Link>
                <Link 
                    to={`/${date.dayNext.year}/${date.dayNext.month}/${date.dayNext.day}`} 
                    className='btn btn-primary ml-1'
                >
                    {'>'}
                </Link>
            </Row>

            <Row className="mt-3 d-flex align-items-center">
                Лунный день: 
                <Button variant="primary" className="ml-1 mr-1 " onClick={() => { changeMoonDay(-1) }}> - </Button>
                {dataFields.moon_day_no}
                <Button variant="primary" className="ml-1 mr-2" onClick={() => { changeMoonDay(1)}}> + </Button>
            </Row>

            <Row className="mt-3">
                <span className={"mr-3 " + style.day_attr + ' ' + (dataFields.good_for_haircutself ? '' : style.day_param_off)} 
                    onClick={()=>{changeDay({ good_for_haircutself: !dataFields.good_for_haircutself})}}
                >
                    <img className={style.day_img} src="/public/img/scissors.png" />
                </span>
                <span className={"mr-3 " + style.day_attr + ' ' + (dataFields.good_for_travel ? '' : style.day_param_off)} 
                    onClick={() =>{changeDay({ good_for_travel: !dataFields.good_for_travel})}}
                >
                    <img className={style.day_img} src="/public/img/plane.png" />
                </span>
                <span className={"mr-3 " + style.day_attr + ' ' + (dataFields.tersuud ? '' : style.day_param_off)} 
                    onClick={() => { changeDay({ tersuud: !dataFields.tersuud})}}
                >
                    Т
                </span>
            </Row>
        </Container>
    );
}

Day.propTypes = {
    list: PropTypes.array
};

Day.defaultProps = {
    list: []
};
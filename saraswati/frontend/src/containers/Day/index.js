import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import getDateFromURL from '~/api/helpers/getDate';
import { getDateData, getHurals} from  '~/api/getData.js';
import { postDateData } from '~/api/postData';
import dayFlags from '~/store/dayFlags.js';
import HuralSelect from '~/components/huralSelect/index';
import style from './day.module.css';


export default function Day(props) {

    let dataFields = {}, 
        setDataFields;

    for (let i = 0, count = dayFlags.length; i < count; i++){
        dataFields[dayFlags[i].id] = null;
    }

    [dataFields, setDataFields] = useState(dataFields);
    const [hurals, setHurals] = useState([]);

    const date = getDateFromURL(props.match.params);

    const changeDay = (param)=>{
        postDateData(date, param)
    }

    const changeMoonDay = (delta)=>{
        changeDay({ moon_day_no: dataFields.moon_day_no + delta })
    }

    const changeMorningHutal = (event) => {
        changeDay({morning_hural_id: +event.target.value})
    }

    const changeDayHutal = (event) => {
        changeDay({ day_hural_id: +event.target.value})
    }

    useEffect(() => {
        getDateData(date)
            .then(result=>{
                setDataFields(result);
            })
        
    },[]);

    useEffect(() => {

        getHurals(date)
            .then(result => {
                if (result.length > 0) {
                    setHurals(result);
                }
            })
    }, []);

    return (
        <Container>
            <Row className="mt-3 d-flex align-items-center">
                <Col>
                    <Link
                        to={`/${date.dayPrev.year}/${date.dayPrev.month}/${date.dayPrev.day}`}
                        className='btn btn-primary ml-3 mr-1'
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
               </Col>
            </Row>

            <Row className="mt-3 d-flex align-items-center">
                    Лунный день:
                    <Button variant="primary" className="ml-1 mr-1 " onClick={() => { changeMoonDay(-1) }}> - </Button>
                    {dataFields.moon_day_no}
                    <Button variant="primary" className="ml-1 mr-2" onClick={() => { changeMoonDay(1) }}> + </Button>
            </Row>

            <Row className="mt-3 ">
                <Col md={6} >
                    {
                        dayFlags.map((flag) => {
                            return (
                                <span 
                                    key={flag.id}
                                    className={"mr-3 " + style.day_attr + ' ' + (dataFields[flag.id] ? '' : style.day_param_off)}
                                    onClick={() => { changeDay({ [flag.id]: !dataFields[flag.id] }) }}
                                >
                                    {flag.flag}  {' '}
                                </span> )
                        })
                    }
                </Col>
            </Row>

            <Row className="mt-3 ">
                <Col md={6} >
                    <span className="">
                        Утренний хурал
                    </span>
                    <span className="">
                        <HuralSelect
                            hurals={hurals}
                            changeHural={changeMorningHutal}
                            selectedId={dataFields.morning_hural_id}
                        />
                    </span>
                    <br/>
                    <span className="">
                        Вечерний хурал
                    </span>
                    <span className="">
                        <HuralSelect
                            hurals={hurals}
                            changeHural={changeDayHutal}
                            selectedId={dataFields.day_hural_id}
                        />
                    </span>
                    
                </Col>
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
import React, { useState, useEffect } from 'react';
import PropTypes, { func } from 'prop-types';
import { Container, Row, Button, Col } from 'react-bootstrap';
import getDateFromURL from '~/api/helpers/getDate';
import { getDateData, getHurals, getRituals} from  '~/api/getData.js';
import { postDateData } from '~/api/postData';
import dayFlags from '~/store/dayFlags.js';
import DayHead from './DayHead';
import DayMoon from './DayMoon';
import DayFlags from './DayFlags';
import DayHurals from './DayHurals';
import DayEvents from './DayEvents';


export default function Day(props) {

    let dataFields = {}, 
        setDataFields;
    for (let i = 0, count = dayFlags.length; i < count; i++){
        dataFields[dayFlags[i].id] = null;
    }
    [dataFields, setDataFields] = useState(dataFields);

    const [blockedFields, setblockedFields] = useState([]);
    const [hurals, setHurals] = useState([]);
    const [rituals, setRituals] = useState([]);

    const date = getDateFromURL(props.match.params);

    const changeDay = (param)=>{

        setblockedFields([
            ...blockedFields,
            ...Object.keys(param)
        ]);

        return(
            postDateData(date, param)
            .then(function(data){
                setDataFields(data);
                setblockedFields(
                    blockedFields.filter(
                        item => { return (Object.keys(param).indexOf(item) + 1) }
                    )
                );
            })
        )
    }

    const changeMoonDay = (delta)=>{
        changeDay({ moon_day_no: dataFields.moon_day_no + delta })
    }

    useEffect(() => {
        getDateData(date)
            .then(result=>{
                setDataFields(result);
            })
        
    }, [props.match.params]);

    useEffect(() => {

        getHurals(date)
            .then(result => {
                if (result.length > 0) {
                    setHurals(result);
                }
            });

        getRituals(date)
            .then(result => {
                if (result.length > 0) {
                    setRituals(result);
                }
            });
    }, []);

    return (
        <Container>
            <Row className="mt-3 d-flex align-items-center">
                <DayHead date={date}/>
            </Row>

            <Row className="mt-3 d-flex align-items-center">
                <DayMoon
                    dataFields={dataFields} 
                    isBlocked={blockedFields.indexOf('moon_day_no') + 1}
                    changeMoonDay={changeMoonDay}
                />
            </Row>

            <Row className="mt-3 ">
                <DayFlags
                    dayFlags={dayFlags}
                    dataFields={dataFields}
                    blockedFields={blockedFields}
                    changeDay={changeDay}
                />
            </Row>

            <Row className="mt-3 ">
                <DayHurals
                    hurals={hurals}
                    dataFields={dataFields}
                    blockedFields={blockedFields}
                    changeDay={changeDay}
                />
            </Row>

            <Row className="mt-3 mb-3 flex-column">
                <DayEvents 
                    rituals={rituals}
                    events={dataFields.events}
                    blockedFields={blockedFields}
                    changeDay={changeDay}
                />
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
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Button } from 'react-bootstrap';
import getDateFromURL from '~/api/helpers/getDate';
import {getDateData} from  '~/api/get.js'


export default function Day(props) {

    const [dataFields, setDataFields] = useState({ moon_day_no:0 });

    const date = getDateFromURL(props.match.params);

    useEffect(() => {
        console.log('start')
        
        getDateData(date)
            .then(result=>{
                if (result.length>0){
                    setDataFields(result[0].fields);
                    console.log(result[0].fields);
                }
            })
        
    },[]);

    return (
        <Container>
            <Row className="mt-3 d-flex align-items-center">
                <Button variant="primary" className="mr-1">{'<'}</Button>
                {date.day} {date.monthWord} {date.year}
                <Button variant="primary" className="ml-1">{'>'}</Button>
            </Row>
            <Row className="mt-3 d-flex align-items-center">
                Лунный день: {dataFields.moon_day_no}
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
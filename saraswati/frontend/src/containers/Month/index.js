import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Row } from 'react-bootstrap';
import getDateFromURL from '~/api/helpers/getDate';
import { getMonthData, getHurals } from '~/api/getData.js'
import { Link } from 'react-router-dom';
import style from './month.module.css';
import MonthLine from './MonthLine/index';
import regeneratorRuntime from "regenerator-runtime";

export default function Month(props) {

    const date = getDateFromURL(props.match.params);
    const prevBtn = { 
        month: date.month > 1 ? date.month - 1 : 12,
        year: date.month > 1 ? date.year : date.year - 1 
    }
    const nextBtn = { 
        month: date.month < 12 ? date.month + 1 : 1,
        year: date.month < 12 ? date.year : date.year + 1 
    }

    const [lines, setLines] = useState([]);
    const [hurals, setHurals] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            getMonthData(date)
                .then(result => {
                    if (result.length > 0) {
                        setLines(result);
                    }
                })
        };
        fetchData();
    }, [props.match.params]);

    useEffect(() => {

        const fetchData = async () => {
            getHurals(date)
                .then(result => {
                    if (result.length > 0) {
                        setHurals(result);
                    }
                })
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Row className="mt-3 ml-3 d-flex align-items-center">
                <Link to={`/${prevBtn.year}/${prevBtn.month}`} className='mr-1 btn btn-primary'>{'<'}</Link>
                <span className={style.month_title}>
                    {date.monthWord} {date.year} 
                </span>
                <Link to={`/${nextBtn.year}/${nextBtn.month}`} className='ml-1 btn btn-primary'>{'>'}</Link>
           </Row>
           <Row className='mt-3'>
                {<MonthLine lines={lines} hurals={hurals}/> }   
           </Row>
        </Container>
    );
}

Month.propTypes = {
    list: PropTypes.array
};

Month.defaultProps = {
    list: []
};
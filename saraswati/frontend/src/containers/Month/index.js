import React, { useState, useEffect } from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import getDateFromURL from '~/api/helpers/getDate';
import { getMonthData, getHurals } from '~/api/getData.js'
import { postDateData } from '~/api/postData.js'
import { Link } from 'react-router-dom';
import style from './month.module.css';
import MonthLine from './MonthLine/index';

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

    const [list, setlist] = useState([]);
    const [hurals, setHurals] = useState([]);

    const changeDay = (day, params)=>{
        const newlist = list.map(item=>{
            if (item.day == day){
                const newItem = {
                    ...item,
                    ...params
                }
                return newItem;
            }
            return item;
        });
        setlist(newlist);
    }

    const postChangedDay=(day, param)=>{
        const postDate = {
            ...date,
            day
        }
        postDateData(postDate, param);
    }

    const changeHural = (year, day, hural, id)=>{
        changeDay(day, { [hural]: id})
        postChangedDay(day, { [hural]: id})
    }

    useEffect(() => {

        getMonthData(date)
            .then(result => {
                if (result.length > 0) {
                    setlist(result);
                }
            })
    }, [props.match.params]);

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
            <Row className="mt-3 ml-3 d-flex align-items-center">
                <Link to={`/${prevBtn.year}/${prevBtn.month}`} className='mr-1 btn btn-primary'>{'<'}</Link>
                <span className={style.month_title}>
                    {date.monthWord} {date.year} 
                </span>
                <Link to={`/${nextBtn.year}/${nextBtn.month}`} className='ml-1 btn btn-primary'>{'>'}</Link>
           </Row>
           <Row className='mt-3'>
                {<MonthLine 
                    lines={list} 
                    hurals={hurals}
                    changeHural={changeHural}
                /> }   
           </Row>
        </Container>
    );
}

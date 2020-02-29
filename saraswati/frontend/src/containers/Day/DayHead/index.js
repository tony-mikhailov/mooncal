import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function DayHead(props) {


    return (
        <Col>
            <Link
                to={`/${props.date.dayPrev.year}/${props.date.dayPrev.month}/${props.date.dayPrev.day}`}
                className='btn btn-primary ml-3 mr-1'
            >
                {'<'}
            </Link>

            {props.date.day} <Link to={`/${props.date.year}/${props.date.month}`} className='ml-1'>{props.date.monthWord} {props.date.year} </Link>
            
            <Link
                to={`/${props.date.dayNext.year}/${props.date.dayNext.month}/${props.date.dayNext.day}`}
                className='btn btn-primary ml-1'
            >
                {'>'}
            </Link>
        </Col>

    );
}

DayHead.propTypes = {
    date: PropTypes.object
};

DayHead.defaultProps = {
    date: {}
};
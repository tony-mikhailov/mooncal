import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import style from './day.module.css';


export default function DayFlags(props) {

    return (
        <Col md={6} >
            {
                props.dayFlags.map((flag) => {
                    const isBlocked = Boolean(props.blockedFields.indexOf(flag.id) + 1);
                    return (
                        <span
                            key={flag.id}
                            className={"mr-3 " + 
                                        style.day_attr + ' ' + 
                                        (props.dataFields[flag.id] ? '' : style.day_param_off) + ' ' + 
                                        (isBlocked ? style.day_param_blocked : '')
                                    }
                            onClick={() => { 
                                if (isBlocked) return;
                                props.changeDay({ [flag.id]: !props.dataFields[flag.id] });
                            }}
                        >
                            {flag.flag}  {' '}
                        </span>)
                })
            }
        </Col>

    );
}

DayFlags.propTypes = {
    dayFlags: PropTypes.array
};

DayFlags.defaultProps = {
    dayFlags: []
};
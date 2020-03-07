import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './day.module.css';
import dayFlagsStore from '~/store/dayFlags.js';


export default function DayFlags(props) {

    return (
        <>
            {
                dayFlagsStore.map((flag) => {
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
        </>

    );
}

DayFlags.propTypes = {
    blockedFields: PropTypes.array,
    changeDay: PropTypes.func
};

DayFlags.defaultProps = {
    blockedFields: [],
    changeDay: ()=>{}
};
import React from 'react';
import PropTypes from 'prop-types';
import style from './monthLine.module.css';


export default function MonthLine(props) {

    const indexHurals = {};
    for( let i = 0; i < props.hurals.length; i++){
        indexHurals[props.hurals[i].pk] = props.hurals[i].fields
    };

    return (
        <ul>
            <li className="list_header">
                <span className={style.day_no}>
                    Число
                </span>
                <span className={style.moon_day_no}>
                    Лунный день
                </span>
                <span className={style.morning_hural}>
                    1 хурал
                </span>
                <span className={style.day_hural}>
                    2 хурал
                </span>
            </li>
           {props.lines.sort(item=>item.day_no).map(item => {return(
                <li key={item.fields.day_no}>
                    <span className={style.day_no}>
                        {item.fields.day_no} 
                    </span>
                    <span className={style.moon_day_no}>
                        {item.fields.moon_day_no} 
                    </span>
                    <span className={style.morning_hural}>
                       {props.hurals.length > 0 ? indexHurals[item.fields.morning_hural].short_name : ''} 
                    </span>
                    <span className={style.day_hural}>
                       {props.hurals.length > 0 ? indexHurals[item.fields.day_hural].short_name : ''} 
                    </span>
                </li>
            )})}
        </ul>
    );
}

MonthLine.propTypes = {
    lines: PropTypes.array,
    hurals: PropTypes.array
};

MonthLine.defaultProps = {
    lines: [],
    hurals: []
};
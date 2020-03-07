import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './monthLine.module.css';
import HuralSelect from '~/components/huralSelect';
import dayWeek from '~/store/dayWeek';


export default function MonthLine(props) {

    const indexHurals = {};
    for( let i = 0; i < props.hurals.length; i++){
        indexHurals[props.hurals[i].id] = props.hurals[i]
    };


    const lines = props.lines.sort(item => item.day).map(item => {

        const changeMorningHutal = (event) => {
            props.changeHural(item.year, item.day, "morning_hural_id", +event.target.value)
        }

        const changeDayHutal = (event) => {
            props.changeHural(item.year, item.day, "day_hural_id", +event.target.value)
        }

        return (
            <li key={item.day} className={item.weekday == 7 ? 'mb-3' : '' }>
                <span className={style.day + ' p-2'}>
                    <Link to={`/${item.year}/${item.month}/${item.day}`} className=''>{item.day}</Link>
                </span>
                <span className={style.day_week + ' p-2'}>
                    {dayWeek[item.weekday]}
                </span>
                <span className={style.morning_hural}>
                    <HuralSelect
                        hurals={props.hurals}
                        changeHural={changeMorningHutal}
                        selectedId={item.morning_hural_id}
                    />
                </span>
                <span className={style.day_hural}>
                    <HuralSelect
                        hurals={props.hurals}
                        changeHural={changeDayHutal}
                        selectedId={item.day_hural_id}
                    />
                </span>
                <span className={style.moon_day_no + ' p-2'}>
                    {item.moon_day_no}
                </span>
            </li>
        )
    })

    return (
        <ul className="pl-0">
            <li className="list_header">
                <span className={style.day}>
                    Число
                </span>
                <span className={style.day_week}>
                    День недели
                </span>
                <span className={style.morning_hural}>
                    1 хурал
                </span>
                <span className={style.day_hural}>
                    2 хурал
                </span>
                <span className={style.moon_day_no}>
                    Лунный день
                </span>
            </li>

            {lines}
        </ul>
    );
}

MonthLine.propTypes = {
    lines: PropTypes.array,
    changeHural: PropTypes.func,
    hurals: PropTypes.array
};

MonthLine.defaultProps = {
    lines: [],
    changeHural: ()=>{},
    hurals: []
};
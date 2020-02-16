import React from 'react';
import PropTypes from 'prop-types';
import style from './monthLine.module.css';
import HuralSelect from '~/components/huralSelect/index';


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
            <li key={item.day}>
                <span className={style.day}>
                    {item.day}
                </span>
                <span className={style.moon_day_no}>
                    {item.moon_day_no}
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
            </li>
        )
    })

    return (
        <ul>
            <li className="list_header">
                <span className={style.day}>
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
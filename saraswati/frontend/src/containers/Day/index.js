import React, { useState } from 'react';
import PropTypes from 'prop-types';


export default function Day(props) {


    return (
        <div>
            Month: {props.match.params.month}
            <br/>
            Day:  {props.match.params.day}
        </div>
    );
}

Day.propTypes = {
    list: PropTypes.array
};

Day.defaultProps = {
    list: []
};
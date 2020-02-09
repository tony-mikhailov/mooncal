import React, { useState } from 'react';
import PropTypes from 'prop-types';


export default function Month(props) {

    return (
        <div>
            Month {props.match.params.month}
        </div>
    );
}

Month.propTypes = {
    list: PropTypes.array
};

Month.defaultProps = {
    list: []
};
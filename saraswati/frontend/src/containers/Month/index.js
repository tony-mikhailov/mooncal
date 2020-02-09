import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import getDateFromURL from '~/api/helpers/getDate';


export default function Month(props) {

    const date = getDateFromURL(props.match.params);

    return (
        <Container>
            <div>
                Year: {date.year}
                <br />
                Month {date.monthWord}
            </div>
        </Container>
    );
}

Month.propTypes = {
    list: PropTypes.array
};

Month.defaultProps = {
    list: []
};
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Row } from 'react-bootstrap';
import getDateFromURL from '~/api/helpers/getDate';


export default function Month(props) {

    const date = getDateFromURL(props.match.params);

    return (
        <Container>
            <Row className="mt-3 d-flex align-items-center">
                <Button variant="primary" className="mr-1">{'<'}</Button>
                {date.monthWord} {date.year} 
                <Button variant="primary" className="ml-1">{'>'}</Button>
            </Row>
        </Container>
    );
}

Month.propTypes = {
    list: PropTypes.array
};

Month.defaultProps = {
    list: []
};
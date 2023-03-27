import React from "react";
import PropTypes from 'prop-types'
import {Container} from './styled'
import { ProgressSpinner } from 'primereact/progressspinner';


export default function Loading({ isLoading }) {
    if(!isLoading) return <> </>
    return (
        <Container>
            <div/>
            <ProgressSpinner />
        </Container>
    );
}

Loading.defaultProps = {
    isLoading: false
}

Loading.propTypes = {
    isLoading: PropTypes.bool,
}
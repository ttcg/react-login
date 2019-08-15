import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function LoadingSpinner() {
    return (
        <>
            <div>
                <Spinner animation="border" variant="primary" />{` `}
                Loading...
            </div>
        </>
    )
};
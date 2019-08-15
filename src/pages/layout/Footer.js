import React from 'react';
import {
    Container
} from 'react-bootstrap';
import ReactMoment from 'react-moment'

export default function Footer() {
    return (
        <footer className="fixed-bottom footer">
            <Container>
                <span className="text-muted">&copy; <ReactMoment format='YYYY' /> TTCG</span>
            </Container>
        </footer>
    );
}
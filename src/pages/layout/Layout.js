import React from 'react'
import {
    Container
} from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';

import Header from './Header'
import Footer from './Footer'
import Routes from '../../components/routes/Routes'
import { ModalLoadingSpinner } from '../../components/LoadingSpinner'

import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {
    return (
        <React.Fragment>
            <Header />
            <Container>
                <div className="content">
                    <Routes />
                </div>
                <ModalLoadingSpinner />
                <ToastContainer
					autoClose={3000}
				/>
            </Container>
            <Footer />
        </React.Fragment>
    )
}

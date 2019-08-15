import React from 'react';
import Delay from 'react-delay';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import './ModalLoadingSpinner.css';

export const ModalLoadingSpinner = ({ loading }) => (
    <>
        {loading &&
            <Delay wait={300}>
                <div className="modal-loading">
                    <div className="modal-loading-content">
                        <Spinner animation="border" variant="primary" />{` `}
                        Loading...
                    </div>
                </div>
            </Delay>
        }
    </>
);

const mapStateToProps = (state) => ({
    loading: state.AjaxCounter > 0
})

export default connect(mapStateToProps)(ModalLoadingSpinner);
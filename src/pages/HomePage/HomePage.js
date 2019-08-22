import React from 'react'
import { connect } from 'react-redux'
import {
    Container
} from 'react-bootstrap'
import SignIn from './signIn'
import Applications from "./applications";
import {
    authenticateUser
} from '../../redux/security/security.action'

export const HomePage = ({
    accessToken,
    authenticateUser,
    isLoading,
    isLoggedIn,
    error }) => {        

    return (        
        <Container>            
            {                
                !isLoggedIn &&
                <SignIn
                    error={error}
                    onSubmit={authenticateUser}
                    isLoading={isLoading} />
            }

            {isLoggedIn && accessToken &&
                <Applications accessToken={accessToken} />
            }
        </Container>
    )
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.Security.isLoggedIn,
    accessToken: state.Security.accessToken,
    isLoading: state.Security.isLoading,
    error: state.Security.error
});

const mapDispatchToProps = {
    authenticateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
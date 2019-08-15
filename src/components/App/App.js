import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Layout } from '../../pages/layout'
import { AuthService } from '../../services'
import { populateSecurityData } from '../../redux/security/security.action'

export function App({ populateSecurityData }) {
	useEffect(() => {

		// if (AuthService.isAuthenticated()) {
		// 	console.info('repopulate the security data from local data')

		// 	populateSecurityData({
		// 		isLoggedIn: true,
		// 		email: AuthService.getUserDetail().email
		// 	});
		// }
	}, [populateSecurityData]);

	return (
		<BrowserRouter>
			<Layout />
		</BrowserRouter>
	);
}

const mapDispatchToProps = {
	populateSecurityData
}

export default connect(null, mapDispatchToProps)(App);

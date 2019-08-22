import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Layout } from '../../pages/layout'

export default function App() {

	return (
		<BrowserRouter>
			<Layout />
		</BrowserRouter>
	);
}
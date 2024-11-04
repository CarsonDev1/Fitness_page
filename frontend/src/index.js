import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId='345177848260-gt4s9487god6jt45848agv4ugru143v3.apps.googleusercontent.com'>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</GoogleOAuthProvider>
	</React.StrictMode>
);

reportWebVitals();

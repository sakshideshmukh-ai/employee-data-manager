// src/main.jsx
// Application entry point. Wraps the React app in the Redux Provider so
// all components have access to the global store.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import './App.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* Provider makes the Redux store available to every component in the tree */}
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);

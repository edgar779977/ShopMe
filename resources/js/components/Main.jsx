import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '../store/store';
import App from './components/App';
import {IsMobileProvider} from "../../contexts/IsMobileContext";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <IsMobileProvider>
            <App/>
        </IsMobileProvider>
    </Provider>
);

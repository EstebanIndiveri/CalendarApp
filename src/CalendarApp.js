import React from 'react';
import AppRouter from './route/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';

const CalendarApp = () => {
    return ( 
    <Provider store={store}>
        <AppRouter/>
    </Provider> );
}
 
export default CalendarApp;
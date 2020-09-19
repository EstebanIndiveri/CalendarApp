import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import AppRouter from '../../route/AppRouter';


const middlewares=[thunk];
const mockStore=configureStore(middlewares);


// store.dispatch=jest.fn();



describe('prueba en AppRoute', () => {
    test('Mostrar el loader', () => {
        const initState={
            auth:{
                checking:true
            }
        };
        const store=mockStore(initState);

        const wrapper=mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('Mostrar ruta publica', () => {
        const initState={
            auth:{
                checking:false,
                uid:null
            }
        };
        const store=mockStore(initState);
        
        const wrapper=mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBe(true);
    });

    test('Mostrar ruta privada', () => {
        const initState={
            calendar:{
                events:[]
            },
            ui:{
                modalOpen:false
            },
            auth:{
                checking:false,
                uid:'123',
                name:'juanc arlos'
            }
        };
        const store=mockStore(initState);
        
        const wrapper=mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.calendar-screen').exists()).toBe(true);
    });
    
})

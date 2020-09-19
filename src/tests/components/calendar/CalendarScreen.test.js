import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import CalendarScreen from '../../../components/calendar/CalendarScreen';

// jest.mock('../../../actions/events',()=>({
//     eventStartDelete:jest.fn()
// }))

const middlewares=[thunk];
const mockStore=configureStore(middlewares);

const initState={
        calendar:{
            events:[],
        },
        auth:{
            uid:'123',
            name:'test'
        },
        ui:{
            openModal:false
        }
    
};

const store=mockStore(initState);
store.dispatch=jest.fn();

const wrapper=mount(
    <Provider store={store}>
        <CalendarScreen/>
    </Provider>
)



describe('prueba en CalendarScreen/>', () => {
    test('match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('interacciones con calendar', () => {
        
    })
    
    
})

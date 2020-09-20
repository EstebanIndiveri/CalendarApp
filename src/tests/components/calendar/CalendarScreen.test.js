import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import CalendarScreen from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/events';

jest.mock('../../../actions/events',()=>({
    eventSetActive:jest.fn(),
    eventStartLoading:jest.fn()
}))

Storage.prototype.setItem=jest.fn();

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
    });

    test('interacciones con calendar', () => {
       const calendar=wrapper.find('Calendar');
       const calendarmsg=calendar.prop('messages');
       expect(calendarmsg).toEqual(messages)

       calendar.prop('onDoubleClickEvent')();
       expect(store.dispatch).toHaveBeenCalledWith({type:types.uiOpenModal})

       calendar.prop('onSelectEvent')({start:'Hola'});
        expect(eventSetActive).toHaveBeenCalledWith({start:'Hola'})

       calendar.prop('onView')('week');
       expect(localStorage.setItem).toHaveBeenCalledWith('lastView','week');


    })
    
  
    
    
})

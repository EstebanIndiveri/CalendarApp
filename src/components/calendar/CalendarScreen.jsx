import React, { useState } from 'react'
import Navbar from '../ui/Navbar'
import {Calendar,momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages'
import 'moment/locale/es'
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import AddNewFab from '../ui/AddNewFab';
moment.locale('es');
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const events=[{
    title:'Cumpleaños del jefe',
    start:moment().toDate(),
    end:moment().add(1,'hours').toDate(),
    bgcolor:'#fafafa',
    notes:'comprar el paster',
    user:{
        _id:'123',
        name:'esteban'
    }
}];

const CalendarScreen = () => {
    const dispatch = useDispatch();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'month');

    const onDoubleClick=(e)=>{
        // console.log(e);
        // console.log('abrirm');
        dispatch(uiOpenModal());
    };


    const onSelectEvent=(e)=>{
        // console.log(e);
        dispatch(eventSetActive(e));
        dispatch(uiOpenModal());
    }

    const onViewChange=(e)=>{
        setLastView(e);
        localStorage.setItem('lastView',e);

    }

    const eventStyleGetter=(event,start,end,isSelected)=>{
        const style={
            backgroundColor:'#367CF7',
            borderRadius:'0p',
            opacity:0.8,
            display:'block',
            color:'#FFF'
        }
        
        return{
            style
        }
    };

    return ( 
        <div className="calendar-screen">
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event:CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
            />
            
            <AddNewFab/>
            <CalendarModal/>
            
        </div> 
    );
}
 
export default CalendarScreen;
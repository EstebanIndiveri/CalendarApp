import React from 'react'
import Navbar from '../ui/Navbar'
import {Calendar,momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages'
import 'moment/locale/es'
moment.locale('es');
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const events=[{
    title:'Cumpleaños del jefe',
    start:moment().toDate(),
    end:moment().add(2,'hours').toDate(),
    bgcolor:'#fafafa'
}];

const CalendarScreen = () => {
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
            />
        </div> 
    );
}
 
export default CalendarScreen;
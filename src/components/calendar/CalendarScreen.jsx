import React, { useEffect, useState } from 'react'
import Navbar from '../ui/Navbar'
import {Calendar,momentLocalizer} from 'react-big-calendar'
import moment, { months } from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages'
import 'moment/locale/es'
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventClearActiveEvent, eventStartLoading } from '../../actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';
moment.locale('es');
const localizer = momentLocalizer(moment); // or globalizeLocalizer

// const events=[{
//     title:'Cumpleaños del jefe',
//     start:moment().toDate(),
//     end:moment().add(1,'hours').toDate(),
//     bgcolor:'#fafafa',
//     notes:'comprar el paster',
//     user:{
//         _id:'123',
//         name:'esteban'
//     }
// }];

const CalendarScreen = () => {
    const dispatch = useDispatch();
    //store los eventos
    const {events,activeEvent} = useSelector(state => state.calendar)
    const {uid} = useSelector(state => state.auth);
    const [lastView, setLastView] = useState(localStorage.getItem('lastView')|| 'month');


    useEffect(()=>{
        dispatch(eventStartLoading());
    },[dispatch])


    const onDoubleClick=(e)=>{
        // console.log(e);
        // console.log('abrirm');
        dispatch(uiOpenModal());
    };


    const onSelectEvent=(e)=>{
        // console.log(e);
        dispatch(eventSetActive(e));
    }

    const onViewChange=(e)=>{
        setLastView(e);
        localStorage.setItem('lastView',e);

    }

    const eventStyleGetter=(event,start,end,isSelected)=>{
        const style={
            backgroundColor:(uid===event.user._id)?'#077a07':'#367CF7',
            borderRadius:'0p',
            opacity:0.8,
            display:'block',
            color:'#FFF'
        }
        
        return{
            style
        }
    };
    const onSelectedSlot=(e)=>{
        dispatch(eventClearActiveEvent());
    }

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
                // views={{week:true,month:true,agenda:false}}
                view={lastView}
                onSelectSlot={onSelectedSlot}
                selectable={true}
            />
            
            <AddNewFab/>
            {
                (activeEvent)&& <DeleteEventFab/>
            }
            
            <CalendarModal/>
            
        </div> 
    );
}
 
export default CalendarScreen;
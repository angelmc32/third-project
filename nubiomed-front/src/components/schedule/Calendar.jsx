import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick

import esLocale from '@fullcalendar/core/locales/es';

import '@fullcalendar/core/main.css';
import '@fullcalendar/core/main.js';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/daygrid/main.js';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/timegrid/main.js';
import '@fullcalendar/interaction/main.js';

const Calendar = ({ usertype }) => {

  const calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin];
  const startingEvents = [
    { title: 'Reunion en Hospital Angeles', date: '2019-12-16' },
    { title: 'Descansar', date: '2019-12-18' },
    { title: 'Cena de navidad', date: '2019-12-24' },
    { title: 'Cena de fin de agno', date: '2019-12-31' }
  ];

  let [events, setEvents] = useState(startingEvents);

  useEffect( () => {

    console.log(events);

  }, [events]);

  const handleDateClick = (arg) => {

    setEvents(
      events.concat({
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      })
    );

    console.log(`Clicking somewhere with an argument`)
    console.log(arg);

  }

  return (
    usertype === 'Doctor' ? (

      <div className="uk-section">

        <div className="uk-container">

          <div className="uk-button uk-button-default uk-button-small" onClick={() => console.log(events)}>print calendar state</div>
          <div className="uk-width-1-1">
            <FullCalendar 
              defaultView="timeGridWeek" 
              header={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }}
              locale={esLocale}
              minTime={"06:00:00"} 
              // maxTime={"19:00:00"} 
              plugins={ calendarPlugins } 
              events={events} 
              dateClick={ handleDateClick }
            />
          </div>
          
        </div>
        
      </div>
    ) : (
      <div className="uk-section">

        <div className="uk-container">

          <div className="uk-button uk-button-default uk-button-small" onClick={() => console.log(events)}>print calendar state</div>
          <div className="uk-width-1-1">
            <FullCalendar 
              defaultView="timeGridWeek" 
              header={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
              }}
              locale={esLocale}
              minTime={"06:00:00"} 
              // maxTime={"19:00:00"} 
              plugins={ calendarPlugins } 
              events={events} 
              dateClick={ handleDateClick }
            />
          </div>
          
        </div>
        
      </div>
    )
  )

}

export default Calendar;
import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
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

import CalendarForm from './CalendarForm';

import { getDoctorConsultations, createDoctorConsultation } from '../../services/consultation-services'

const Calendar = ({ usertype }) => {

  const calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin];
  const startingEvents = [
    { title: 'Reunion en Hospital Angeles', date: '2019-12-16' },
    { title: 'Descansar', date: '2019-12-18' },
    { title: 'Cena de navidad', date: '2019-12-24' },
    { title: 'Cena de fin de agno', date: '2019-12-31' }
  ];

  // Destructure form state variable, handleInput and handleFileInput functions for form state manipulation
  const { form, setForm, handleInput } = useForm({});
  // Destructure user and route state variables, as well as setRoute to update route state variable
  const { user, route, setRoute } = useContext(AppContext);
  // Declare facilities state variable and setFacilities function to update the facilities state variable
  const [consultations, setConsultations] = useState([]);
  // Declare single facility state variable and setFacility function to update the single facility state variable
  const [consultation, setConsultation] = useState({});

  let [events, setEvents] = useState(startingEvents);

  useEffect( () => {

    getDoctorConsultations()
    .then( res => {

      const { consultations } = res.data;
      setConsultations(consultations);
      setEvents(consultations);

    })

    console.log(events);

  }, [route]);

  const handleDateClick = (arg) => {

    setEvents(
      events.concat({
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      })
    );

    setRoute('confirmation');
    setForm({date: arg.date, doctor: user._id})

    setConsultation(arg);
    console.log(consultation);

    console.log(`Clicking somewhere with an argument`)
    console.log(arg);

  }

  const handleSubmit = (event) => {

    event.preventDefault();             // Prevent page reloading after submit action
    console.log('submitting')

    console.log(form)
    
    createDoctorConsultation(form)
    .then( res => {

      console.log(res);
      const { consultation } = res.data;
      console.log(consultation);
      setRoute('schedule');

    })
    .catch( error => {
      
      console.log(error);
      
    })
  }

  return (
    usertype === 'Doctor' ? (

      <div className="uk-section uk-padding-small">

        <div className="uk-margin">
          <button className="uk-button uk-button-default uk-button-small" onClick={() => console.log(events)}>print calendar state</button>
        </div>    

        <div className="uk-container">

          { route === 'schedule' ? (
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
            ) : (
              <CalendarForm submit={handleSubmit} handleChange={handleInput} form={form} consultation={consultation} />
            )
          }

          
          
        </div>
        
      </div>
    ) : (

        <div className="uk-container">

          {/* <div className="uk-button uk-button-default uk-button-small" onClick={() => console.log(events)}>print calendar state</div> */}
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
        
    )
  )

}

export default Calendar;
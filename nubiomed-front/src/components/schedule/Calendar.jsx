import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../AppContext';                      // Import AppContext to use created context
import useForm from '../../hooks/useForm';                          // Import useForm custom hook
import { useHistory } from 'react-router-dom';                      // Import useHistory for "redirection"
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

import moment from 'moment';                                        // Import momentjs for date formatting

import CalendarForm from './CalendarForm';

import { getDoctorConsultations, createDoctorConsultation, createUserConsultation } from '../../services/consultation-services'

const Calendar = ({ usertype, doctorID = null }) => {

  const calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin];

  // Destructure form state variable, handleInput functions for form state manipulation
  const { form, setForm, handleInput } = useForm({});
  // Destructure user and route state variables, as well as setRoute to update route state variable
  const { user, route, setRoute } = useContext(AppContext);
  // Declare facilities state variable and setFacilities function to update the facilities state variable
  const [consultations, setConsultations] = useState([]);
  // Declare single facility state variable and setFacility function to update the single facility state variable
  const [consultation, setConsultation] = useState({});

  let [events, setEvents] = useState({});
  let [confirmation, setConfirmation] = useState(false);

  const { push } = useHistory();

  useEffect( () => {

    if ( user.usertype === 'Doctor' ) {

      getDoctorConsultations()
      .then( res => {

        const { consultations } = res.data;
        setConsultations(consultations);
        setEvents(consultations);

      })
    
    } else if ( user.usertype === 'Patient' ) {

      getDoctorConsultations(doctorID)
      .then( res => {

        const { consultations } = res.data;
        setConsultations(consultations);
        setEvents(consultations);

      })

    }

  }, [route]);

  const handleDateClick = (arg) => {

    setEvents(
      events.concat({
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      })
    );

    if ( user.usertype === 'Doctor' ) {

      setRoute('confirmation');
      setForm({date: moment(arg.date).local(), doctor: user._id})

      setConsultation(arg);

    } else if ( user.usertype === 'Patient' ) {

      setConfirmation(true);
      setForm({date: moment(arg.date).local(), patient: user._id})
      setConsultation(arg);

    }

  }

  const handleSubmit = (event) => {

    event.preventDefault();             // Prevent page reloading after submit action

    if ( user.usertype === 'Doctor' ) {

      createDoctorConsultation(form)
      .then( res => {

        const { consultation } = res.data;
        setRoute('schedule');

      })
      .catch( error => {
        
        console.log(error);
        
      })

    } else if ( user.usertype === 'Patient' ) {

      createUserConsultation(form, doctorID)
      .then( res => {

        const { consultation } = res.data;
        push('/home');
        

      })
      .catch( error => {
        
        console.log(error);
        
      })

    }
    
    
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

          { route === 'schedule' ? (
              <div className="uk-width-1-1">

                { !confirmation ? 

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
                  : <CalendarForm submit={handleSubmit} handleChange={handleInput} form={form} consultation={consultation} />
                }
              </div>
            ) : route === 'confirmation' ? (
              <h4>Confirmation form</h4>
            ) : <h4>LOL</h4>
          }
          
          
        </div>
        
    )
  )

}

export default Calendar;
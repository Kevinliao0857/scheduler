import React, { useState, useEffect } from "react";
const axios = require('axios').default;


export default function useApplicationData() {
  // const [day, setDay] = useState("Monday");
    // const [days, setDays] = useState([]);
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });
    
    const setDay = day => setState({...state, day});
    // const setDays = (days) => setState(prev => ({ ...prev, days }));
  
    
    useEffect(() => {
      Promise.all([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers"),
      ]).then((all) => {
        // console.log(all)
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      })
      
    }, [])
    
  
    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      }; 
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
  
        setState({
          ...state, 
          appointments
        })
      })
    };
  
    function cancelInterview(id) {
      const appointment = {
        ...state.appointments[id],
        interview: null
      }; 
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      return axios.delete(`/api/appointments/${id}`)
      .then(() => {
  
        setState({
          ...state, 
          appointments
        })
      })
    };
  
    return { state, setDay, bookInterview, cancelInterview }

}
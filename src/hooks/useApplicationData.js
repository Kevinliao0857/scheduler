import { useState, useEffect } from "react";
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
      
      const spots = updateSpots(state.day, state.days, appointments)
      return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState({
          ...state, 
          appointments,
          days: spots /* or just spots if things break */

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
      
      const spots = updateSpots(state.day, state.days, appointments)
      return axios.delete(`/api/appointments/${id}`)
      .then(() => {
  
        setState({
          ...state, 
          appointments,
          days: spots
        })
      })
    };
  
    function updateSpots(day, days, appointments) {
      const filterDay = days.find(item => item.name === day);
      const unBooked = getUnbookedCount(filterDay, appointments);
      const newArray = days.map(item => {
        if (item.name === day) {
          return { ...item, spots: unBooked }
        }
        return item;
      })
      console.log(newArray)
      return newArray;
    };


    function getUnbookedCount(day, appointments) {
      let count = 0;
      for (const id of day.appointments) {
        const appointment = appointments[id];
        if (!appointment.interview) {
          count++;
        }
      }
      return count;
    }


    
    
    
    return { state, setDay, bookInterview, cancelInterview }
    
  }

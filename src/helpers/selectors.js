

export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find(days => days.name === day)
  if (!filteredDays) {
    return []
  }

  const appId = filteredDays.appointments
  const appForDay = [];

  for(const id in state.appointments) {
    if(appId.includes(Number(id))) {
      appForDay.push(state.appointments[id])
    }
  }
return appForDay

};
  

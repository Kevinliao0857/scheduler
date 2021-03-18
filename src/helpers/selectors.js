
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find(days => days.name === day)
  if (!filteredDays) {
    return []
  }

  const appId = filteredDays.appointments
  const appForDay = [];

  for(const id in state.appointments) {
    if(appId.includes(state.appointments[id].id)) {
      appForDay.push(state.appointments[id])
    }
  }
return appForDay

};
  
export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
    for(const id in state.interviewers) {
      if(interview.interviewer === state.interviewers[id].id) {
        // console.log(interview.interviewer)
        return {
          student: interview.student,
          interviewer: {...state.interviewers[id]}
        };
      }
    }
  };

return;
};


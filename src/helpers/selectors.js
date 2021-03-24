export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((elem) => elem.name === day);
  if (!filteredDays) {
    return [];
  }

  const appId = filteredDays.appointments;
  const appForDay = [];

  for (const id in state.appointments) {
    if (appId.includes(state.appointments[id].id)) {
      appForDay.push(state.appointments[id]);
    }
  }
  return appForDay;
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.find((elem) => elem.name === day);
  if (!filteredDays) {
    return [];
  }

  const intId = filteredDays.interviewers;
  const intForDay = [];

  for (const id in state.interviewers) {
    if (intId.includes(state.interviewers[id].id)) {
      intForDay.push(state.interviewers[id]);
    }
  }
  return intForDay;
}

export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
    for (const id in state.interviewers) {
      if (interview.interviewer === state.interviewers[id].id) {
        return {
          student: interview.student,
          interviewer: { ...state.interviewers[id] },
        };
      }
    }
  }
};

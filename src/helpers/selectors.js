

export default function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(day => day.day === day)
};
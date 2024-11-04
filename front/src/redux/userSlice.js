import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    loggin: false,
    user: {}
  },
  userAppointments: []
};

export const userSlice = createSlice({
  name: "userLoged",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserAppointments: (state, action) => { // Added name for the second reducer
      state.userAppointments = action.payload;
    },
    setUserAppointmentCancelled: (state, action) => {
      const appointmentId = action.payload;
      state.userAppointments = state.userAppointments.map(appointment => 
        appointment.id === appointmentId ? { ...appointment, status: "Cancelled" } : appointment
      );
    }
  }
});

export const { setUserData, setUserAppointments, setUserAppointmentCancelled } = userSlice.actions;
export default userSlice.reducer;

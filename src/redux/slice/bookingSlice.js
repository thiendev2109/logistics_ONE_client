import { createSlice } from "@reduxjs/toolkit";

const BookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: {
      allBookings: null,
      isFetching: false,
      error: false,
      message: null,
    },
  },

  reducers: {
    createBookingStart: (state) => {
      state.bookings.isFetching = true;
      state.bookings.allBookings = null;
      state.bookings.message = "Loading";
    },
    createBookingSuccess: (state, action) => {
      state.bookings.isFetching = false;
      state.bookings.error = false;
      state.bookings.message = "Create new bookings Success";
    },
    createBookingFailed: (state, action) => {
      state.bookings.isFetching = false;
      state.bookings.error = true;
      state.bookings.message = "Somethings went wrong";
    },

    getBookingStart: (state) => {
      state.bookings.isFetching = true;
      state.bookings.allBookings = null;
      state.bookings.message = "Loading";
    },
    getBookingSuccess: (state, action) => {
      state.bookings.isFetching = false;
      state.bookings.allBookings = action.payload;
      state.bookings.error = false;
      state.bookings.message = "Success";
    },
    getBookingFailed: (state) => {
      state.bookings.isFetching = false;
      state.bookings.error = true;
      state.bookings.message = "Somethings went wrong";
    },

    deleteBookingStart: (state) => {
      state.bookings.isFetching = true;
      state.bookings.message = "Loading";
    },
    deleteBookingSuccess: (state) => {
      state.bookings.isFetching = false;
      state.bookings.error = false;
      state.bookings.message = "Success";
    },
    deleteBookingFailed: (state) => {
      state.bookings.isFetching = false;
      state.bookings.error = true;
      state.bookings.message = "Somethings went wrong";
    },

    updateBookingStart: (state) => {
      state.bookings.isFetching = true;
      state.bookings.message = "Loading";
    },
    updateBookingSuccess: (state) => {
      state.bookings.isFetching = false;
      state.bookings.error = false;
      state.bookings.message = "Success";
    },
    updateBookingFailed: (state) => {
      state.bookings.isFetching = false;
      state.bookings.error = true;
      state.bookings.message = "Somethings went wrong";
    },
  },
});

export default BookingSlice;

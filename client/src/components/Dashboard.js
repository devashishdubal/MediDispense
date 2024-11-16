import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, Paper } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Contexts/AuthContext'; // Assuming you have an AuthProvider

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(""); // Time slot state
  const [selectedDoctor, setSelectedDoctor] = useState(""); // Doctor state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false); // Booking confirmation state
  const [isError, setIsError] = useState(false); // Error state
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [previousAppointments, setPrevAppointments] = useState([]); // Previous appointments state
  const [doctors, setDoctors] = useState([]); // Doctors data
  const { user, loggedIn, setUser, setLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadAppointments();
    loadDoctors();
  }, [user]);

  // Load doctors from backend
  const loadDoctors = async () => {
    try {
      const response = await fetch('http://localhost:8000/doctors/getall', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        // Handle server-side error
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create appointment.');
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error loading doctors:', error);
    }
  };

  // Load previous appointments from backend
  const loadAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:8000/appointments/get/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        // Handle server-side error
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create appointment.');
      }
      const data = await response.json();
      setPrevAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleBookAppointmentClick = () => {
    setIsModalOpen(true);
    setIsBookingConfirmed(false); // Reset booking confirmation status when opening the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmAppointment = async () => {
    try {
      if (!selectedDate || !selectedTime || !selectedDoctor) {
        alert("Please select a date, time, and doctor.");
        return;
      }
      const data = {
        doctorName: selectedDoctor,
        userId: user._id,
        appointmentDate: selectedDate,
        appointmentStart: selectedTime,
        appointmentEnd: (selectedTime + 1)
      }

      const response = await fetch("http://localhost:8000/appointments/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      if (!response.ok) {
        // Handle server-side error
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create appointment.');
      }
      setIsBookingConfirmed(true); // Set confirmation status to true
      setIsError(false);
      setErrorMessage('');
      setTimeout(() => {

      }, 3000); // Delay of 3 seconds
      loadAppointments();
    } catch (error) {
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
      setIsBookingConfirmed(false);
    }
    // setIsModalOpen(false);
  };

  const logOut = () => {
    setUser(null);
    navigate("/login");
  }

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #66B3FF 0%, #33CCCC 100%)', // Double colored gradient (soft blue to teal)
        minHeight: '100vh',
        p: 4,
        position: 'relative', // To position the button at the bottom-right
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 'bold',
          color: '#003366', // Dark Blue color for the title
          marginBottom: 4,
        }}
      >
        MediDispense
      </Typography>

      {/* Main content */}
      <Grid container justifyContent="center" alignItems="flex-start" spacing={3}>
        {/* Left-aligned grid item for Previous Appointments */}
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: '#f9f9f9', // Softer off-white background
              borderRadius: 2,
              boxShadow: 2, // Softer shadow
              width: '100%',
            }}
          >
            {/* Previous Appointments Title */}
            <Typography
              variant="h5"
              align="left"
              color="text.primary"
              sx={{ marginBottom: 2, fontWeight: 'bold' }}
            >
              Previous Appointments
            </Typography>

            {/* Previous Appointments Table */}
            <Box>
              <Grid container spacing={3}>
                {previousAppointments.map((appointment) => {
                  // Extract and format the date
                  const d = new Date(appointment.appointmentDate);
                  const formattedDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={appointment._id}>
                      <Box
                        sx={{
                          border: '1px solid #ddd',
                          borderRadius: 2,
                          padding: 2,
                          boxShadow: 2,
                          backgroundColor: '#f9f9f9',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: 1
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {appointment.doctorId.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formattedDate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {appointment.appointmentStart + ":00"}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 'bold',
                            color: appointment.status === 'Completed' ? 'green' : 'orange',
                            textAlign: 'center'
                          }}
                        >
                          {appointment.status}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>


          </Paper>
        </Grid>
      </Grid>

      {/* Button to open modal */}
      <Button
        variant="contained"
        onClick={handleBookAppointmentClick}
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#f9f9f9', // White background
          color: '#003366', // Text color for better contrast
          '&:hover': { backgroundColor: '#F0F0F0' }, // Light gray on hover
          padding: '16px 32px',
          fontSize: '1.2rem',
          height: '56px',
        }}
      >
        Book Appointment
      </Button>

      <Button
        variant="contained"
        onClick={logOut}
        sx={{
          position: 'absolute',
          top: 30,
          right: 20,
          backgroundColor: '#f9f9f9', // White background
          color: '#003366', // Text color for better contrast
          '&:hover': { backgroundColor: '#F0F0F0' }, // Light gray on hover
          padding: '16px 32px',
          fontSize: '1.2rem',
          height: '56px',
        }}
      >
        Log Out
      </Button>

      {/* Appointment Booking Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Book an Appointment</DialogTitle>
        <DialogContent>
          {/* DatePicker */}
          <Box sx={{ marginBottom: 2 }}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              minDate={new Date()} // Prevent selecting past dates
              placeholderText="Select Appointment Date"
              inline
              customInput={<TextField variant="outlined" fullWidth />}
            />
          </Box>

          {/* Time Slot Selection */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1">Select Time Slot</Typography>
            <Grid container spacing={1}>
              {Array.from({ length: 7 }, (_, i) => {
                const timeSlot = `${10 + i}:00`;
                const v = 10 + i;
                return (
                  <Grid item xs={4} key={v}>
                    <Button
                      variant={selectedTime === v ? 'contained' : 'outlined'}
                      color="primary"
                      fullWidth
                      onClick={() => handleTimeChange(v)}
                    >
                      {timeSlot}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* Doctor Selection */}
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Doctor</InputLabel>
              <Select
                value={selectedDoctor}
                onChange={(e) => { setSelectedDoctor(e.target.value); }}
                label="Doctor"
                fullWidth
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor._id} value={doctor.name}>
                    {doctor.name} ({doctor.specialization})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Confirmation Message */}
          {isBookingConfirmed && selectedDoctor && (
            <Box sx={{ marginTop: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="green">
                Appointment Confirmed!
              </Typography>
              <Typography variant="body1">
                Your appointment with {selectedDoctor} is confirmed for {selectedDate?.toLocaleDateString()} at {selectedTime}.
              </Typography>
            </Box>
          )}
          {isError && selectedDoctor && (
            <Box sx={{ marginTop: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="green">
                Error!
              </Typography>
              <Typography variant="body1">
                {errorMessage}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Close
          </Button>
          {!isBookingConfirmed && (
            <Button onClick={handleConfirmAppointment} color="primary" disabled={!selectedDate || !selectedTime || !selectedDoctor}>
              Confirm Appointment
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;

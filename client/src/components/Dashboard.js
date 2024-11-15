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
  const [previousAppointments, setPrevAppointments] = useState([]); // Previous appointments state
  const [doctors, setDoctors] = useState([]); // Doctors data
  const auth = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(auth.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    loadAppointments();
    loadDoctors();
  }, [user]);

  // Load doctors from backend
  const loadDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/getDoctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error loading doctors:', error);
    }
  };

  // Load previous appointments from backend
  const loadAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/get/${user._id}`);
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

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleBookAppointmentClick = () => {
    setIsModalOpen(true);
    setIsBookingConfirmed(false); // Reset booking confirmation status when opening the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedDoctor) {
      alert("Please select a date, time, and doctor.");
      return;
    }
    setIsBookingConfirmed(true); // Set confirmation status to true
  };

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
      <Grid container justifyContent="flex-start" alignItems="flex-start" spacing={3}>
        {/* Left-aligned grid item for Previous Appointments */}
        <Grid item xs={12} sm={8} md={6} lg={5}>
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
            <Typography variant="h5" align="left" color="text.primary" sx={{ marginBottom: 2 }}>
              Previous Appointments
            </Typography>

            {/* Previous Appointments Table */}
            <Box>
              <Grid container spacing={2}>
                {previousAppointments.map((appointment) => (
                  <Grid item xs={12} key={appointment.id}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <Typography variant="body1">{appointment.date}</Typography>
                      <Typography variant="body1">{appointment.time}</Typography>
                      <Typography variant="body1">{appointment.doctor}</Typography>
                      <Typography variant="body2" color={appointment.status === 'Completed' ? 'green' : 'orange'}>
                        {appointment.status}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Button to open modal */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleBookAppointmentClick}
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#66B3FF',
          '&:hover': { backgroundColor: '#4DA6FF' },
          padding: '16px 32px', // Increased padding for a larger button
          fontSize: '1.2rem',    // Increase font size for better readability
          height: '56px',        // Increase the height of the button
        }}
      >
        Book Appointment
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
                return (
                  <Grid item xs={4} key={timeSlot}>
                    <Button
                      variant={selectedTime === timeSlot ? 'contained' : 'outlined'}
                      color="primary"
                      fullWidth
                      onClick={() => handleTimeChange(timeSlot)}
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
                onChange={handleDoctorChange}
                label="Doctor"
                fullWidth
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
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

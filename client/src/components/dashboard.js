// Dashboard.js
import React, { useState } from 'react';
import { Box, Text, Button, Flex, Grid, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Table, Thead, Tbody, Tr, Th, Td, Select, Stack } from '@chakra-ui/react';
import DatePicker from 'react-datepicker'; // Import react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for react-datepicker
import { motion } from 'framer-motion'; // Import motion from framer-motion for animations

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(""); // State for selected time slot
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State for selected doctor
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false); // State for booking confirmation

  const [previousAppointments, setPrevAppointments] = useState([]);
  const [doctors,setDoctors] = useState([]);

  const loadDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/getDoctors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json",  
        },
        credentials: 'include'
      });
      const data = await response.json();
      console.log(data);
      setDoctors(data);

    } catch (error) {
      console.error('Error loading doctors:', error);
    }
  }

  const loadAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/get/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json",  
        },
        credentials: 'include'
      });
      const data = await response.json();
      console.log(data);
      setPrevAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  }

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle time slot change
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  // Handle doctor selection from dropdown
  const handleDoctorChange = (e) => {
    const selectedId = e.target.value;
    const doctor = doctors.find(doc => doc.id.toString() === selectedId);
    setSelectedDoctor(doctor);
  };

  // Open the modal when "Book Appointment" is clicked
  const handleBookAppointmentClick = () => {
    setIsModalOpen(true);
    setIsBookingConfirmed(false); // Reset confirmation status when opening the modal
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Confirm appointment booking
  const handleConfirmAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedDoctor) {
      alert("Please select a date, time, and doctor.");
      return;
    }
    setIsBookingConfirmed(true); // Set confirmation status to true
  };

  useEffect(() => {
    loadAppointments();
    loadDoctors();
  }, [])
  

  return (
    <Box
      bgGradient="linear(to-r, teal.100, purple.100)" // Soft gradient background
      minHeight="100vh"  // Ensure the page fills the screen height
      p={8}  // Padding for the container
      position="relative" // To allow absolute positioning of the button
    >
      {/* Header with the title "MediDispense" */}
      <Flex align="center" justify="space-between" mb={8}>
        <Text fontSize="5xl" fontWeight="bold" color="purple.700">
          MediDispense
        </Text>
      </Flex>

      {/* Main content section */}
      <Grid
        templateColumns="1fr"
        justifyItems="center"
        gap={8}
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
        p={8}
        maxWidth="600px"
        margin="auto"
        bgGradient="linear(to-r, whiteAlpha.700, white)" // Subtle gradient for the card
      >
        {/* Title: Previous Appointments */}
        <Text fontSize="2xl" mb={4} textAlign="center" color="gray.700">
          Previous Appointments
        </Text>

        {/* Table of Previous Appointments */}
        <Box width="100%" textAlign="left">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Doctor</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {previousAppointments.map((appointment) => (
                <Tr key={appointment.id}>
                  <Td>{appointment.date}</Td>
                  <Td>{appointment.time}</Td>
                  <Td>{appointment.doctor}</Td>
                  <Td color={appointment.status === 'Completed' ? 'green.500' : 'yellow.500'}>
                    {appointment.status}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Button to open the modal */}
        <Button
          colorScheme="teal"
          size="lg"
          variant="solid"
          onClick={handleBookAppointmentClick}
          position="absolute"
          bottom="16px" // Align it at the bottom
          right="16px"  // Align it at the right
          _hover={{ bgGradient: 'linear(to-r, teal.200, teal.500)', color: 'white' }}  // Button hover gradient
        >
          Book Appointment
        </Button>
      </Grid>

      {/* Modal for appointment booking */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book an Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Date Picker inside the modal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box mb={6} w="100%">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MMMM d, yyyy" // Format of the displayed date
                  minDate={new Date()} // Disable past dates
                  placeholderText="Select Appointment Date"
                  inline // Display the calendar inline
                />
              </Box>
            </motion.div>

            {/* Time Slot Picker using Chakra UI Buttons */}
            <Box mb={6}>
              <Text mb={2}>Select Time Slot</Text>
              <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                {Array.from({ length: 7 }, (_, i) => {
                  const hour = 10 + i; // Time slots from 10 AM to 4 PM
                  const timeSlot = `${hour}:00`;
                  return (
                    <Button
                      key={timeSlot}
                      onClick={() => handleTimeChange(timeSlot)}
                      colorScheme={selectedTime === timeSlot ? "teal" : "gray"}
                      variant={selectedTime === timeSlot ? "solid" : "outline"}
                      width="100%"
                      isDisabled={isBookingConfirmed} // Disable buttons after confirmation
                    >
                      {timeSlot}
                    </Button>
                  );
                })}
              </Grid>
            </Box>

            {/* Doctor Selection - Dropdown (Select) */}
            <Box mb={6}>
              <Text mb={2}>Select Doctor</Text>
              <Select
                placeholder="Select Doctor"
                onChange={handleDoctorChange}
                value={selectedDoctor ? selectedDoctor.id.toString() : ""}
                isDisabled={isBookingConfirmed} // Disable select after confirmation
              >
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} ({doctor.specialization})
                  </option>
                ))}
              </Select>
            </Box>

            {/* Confirmation message */}
            {isBookingConfirmed && selectedDoctor && (
              <Box mt={6} textAlign="center">
                <Text fontSize="lg" color="green.500" fontWeight="bold">
                  Appointment Confirmed!
                </Text>
                <Text fontSize="md" color="gray.600">
                  Your appointment with {selectedDoctor.name} ({selectedDoctor.specialization}) for {selectedDate?.toLocaleDateString()} at {selectedTime} has been successfully booked.
                </Text>
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            {/* Confirm appointment button */}
            {!isBookingConfirmed && (
              <Button
                colorScheme="teal"
                mr={3}
                onClick={handleConfirmAppointment}
                isDisabled={!selectedDate || !selectedTime || !selectedDoctor} // Disable until all fields are filled
              >
                Confirm Appointment
              </Button>
            )}

            {/* Close button */}
            {isBookingConfirmed && (
              <Button
                variant="solid"
                colorScheme="teal"
                onClick={handleCloseModal}
              >
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Dashboard;

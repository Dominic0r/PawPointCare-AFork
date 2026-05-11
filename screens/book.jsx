import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_APP } from "../firebaseConfig";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signInWithEmailAndPassword} from "firebase/auth";

import { Alert } from 'react-native';
import { FIREBASE_DB } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";



const Book = () => {

  // Use state to track selections later
  const [selectedVet, setSelectedVet] = useState(null);
  const [selectedPet, setSelectedPet] = useState('Max')
  const [selectedSer, setSelectedSer] = useState(null);;
  const [selectedDate, setSelectedDate] = useState('12 Mon');
  const [selectedTime, setSelectedTime] = useState(null);


  const dates = [
    { label: '16 Sat', value: '2026-05-16' },
    { label: '17 Sun', value: '2026-05-17' },
    { label: '18 Mon', value: '2026-05-18' },
  ];
  const timeSlots = [
    { label: '09:00 AM', value: '09:00' },
    { label: '10:30 AM', value: '10:30' },
    { label: '01:00 PM', value: '13:00' }, // 1 PM is 13:00
    { label: '02:30 PM', value: '14:30' }, // 2:30 PM is 14:30
    { label: '04:00 PM', value: '16:00' }, // 4 PM is 16:00
  ];

  const handleBooking = async () => {
    console.log("Button pressed!"); // Check your terminal for this!



    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      Alert.alert("Error", "No user found. Please log in.");
      return;
    }
    // make sure all fields selected
    if (!selectedVet || !selectedSer || !selectedTime || !selectedDate) {
      Alert.alert("Missing Info", "Please select a veterinarian, service, and time slot.");
      return;
    }
    const combinedDateTimeString = `${selectedDate}T${selectedTime}:00`;
    const finalAppointmentDate = new Date(combinedDateTimeString);

    if (isNaN(finalAppointmentDate.getTime())) {
      console.error("Invalid string passed to Date:", finalAppointmentDate);
      return;
    }

    try {

      const docRef = await addDoc(collection(FIREBASE_DB, "bookings"), {

        userEmail: user.email,
        veterinarian: selectedVet,
        petName: selectedPet,
        service: selectedSer,
        appointmentDateAndTime: finalAppointmentDate,
        createdAt: serverTimestamp(),
                                  status: "pending"
      });

      Alert.alert("Success!", `Appointment confirmed with ID: ${docRef.id}`);


      setSelectedVet(null);
      setSelectedSer(null);
      setSelectedTime(null);

    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Booking Failed", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header */}
      <LinearGradient 
        colors={['#5ECDC5', '#3e5974']} 
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <Text style={styles.headerSubtitle}>Schedule a visit for your pet</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 2. Select Veterinarian Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.label}>Select Clinic</Text>
          
          {['Pawpoint Clinic'].map((vet) => (
            <TouchableOpacity 
              key={vet} 

              style={[styles.chip, selectedVet === vet && styles.chipActive]}
              onPress={() => setSelectedVet(vet)}
            >
              <MaterialCommunityIcons name="map-marker-outline" size={18} color="#1F395F" />
              <Text style={styles.selectionText}>{vet}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 3. Select Pet Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.label}>Select Pet</Text>
          <View style={styles.chipRow}>
            {['Max', 'Luna'].map((pet) => (
              <TouchableOpacity 
                key={pet} 
                style={[styles.chip, selectedPet === pet && styles.chipActive]}
                onPress={() => setSelectedPet(pet)}
              >
                <Text style={[styles.chipText, selectedPet === pet && styles.chipTextActive]}>
                  {pet}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 4. Select Service Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.label}>Select Service</Text>
          {['General Checkup', 'Vaccination', 'Dental Cleaning'].map((service) => (
            <TouchableOpacity
            key={service}

            style={[styles.chip, selectedSer === service && styles.chipActive]}
            onPress={() => setSelectedSer(service)}>
              <Text style={styles.selectionText}>{service}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 5. Select Date Section */}
        <View style={styles.sectionCard}>
        <Text style={styles.label}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
        {dates.map((item) => (
          <TouchableOpacity
          key={item.value}
          onPress={() => setSelectedDate(item.value)}
          style={[styles.dateChip, selectedDate === item.value && styles.chipActive]}
          >
          <Text>{item.label.split(' ')[0]}</Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
        </View>

        {/* 6. Select Time Section */}
        <View style={styles.sectionCard}>
        <Text style={styles.label}>Available Slots</Text>
        <View style={styles.timeGrid}>
        {timeSlots.map((slot) => (
          <TouchableOpacity
          key={slot.value}
          style={[styles.timeSlot, selectedTime === slot.value && styles.chipActive]}
          onPress={() => setSelectedTime(slot.value)} // Store '13:00' in state
          >
          <Text style={[styles.chipText, selectedTime === slot.value && styles.chipTextActive]}>
          {slot.label} {/* Show '01:00 PM' to the user */}
          </Text>
          </TouchableOpacity>
        ))}
        </View>
        </View>


        {/* 7. Final Action Button */}
        <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          console.log("TEST: Logic triggered");
          handleBooking();
        }}
        >
        <Text style={styles.confirmButtonText}>Book Appointment</Text>
        </TouchableOpacity>
        



      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 25, paddingTop: 40, paddingBottom: 50 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: 'white', opacity: 0.9, fontSize: 14 },

  scrollContent: { padding: 15, marginTop: -30 }, // Overlap effect

  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F395F',
    marginBottom: 15,
  },
  selectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  selectionText: {
    marginLeft: 10,
    color: '#1F395F',
    fontSize: 14,
  },

  chipRow: { flexDirection: 'row', gap: 10 },
  chip: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  chipActive: { backgroundColor: '#E0F2F1', borderWidth: 1, borderColor: '#5ECDC5' },
  chipText: { color: '#1F395F', fontWeight: '500' },
  chipTextActive: { color: '#5ECDC5', fontWeight: 'bold' },

  confirmButton: {
    backgroundColor: '#5ECDC5',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 40,
  },
  confirmButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default Book;

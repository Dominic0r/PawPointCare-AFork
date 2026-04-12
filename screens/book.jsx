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

const Book = () => {
  // Use state to track selections later
  const [selectedVet, setSelectedVet] = useState(null);
  const [selectedPet, setSelectedPet] = useState('Max');

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
          <Text style={styles.label}>Select Veterinarian</Text>
          
          {['Happy Paws Veterinary Clinic', 'Pet Care Center', 'Animal Hospital Plus', 'Wellness Pet Clinic'].map((vet) => (
            <TouchableOpacity 
              key={vet} 
              style={styles.selectionItem}
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
            <TouchableOpacity key={service} style={styles.selectionItem}>
              <Text style={styles.selectionText}>{service}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 5. Final Action Button */}
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Continue to Date & Time</Text>
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
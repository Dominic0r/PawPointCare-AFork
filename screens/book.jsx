import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  Dimensions,
  Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useAuth } from '../context/AuthContext';
import { createAppointment } from '../services/bookingService';

const { width, height } = Dimensions.get('window');

const Book = () => {
  const [selectedVet, setSelectedVet] = useState(null);
  const [selectedPet, setSelectedPet] = useState('Max');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [nearbyVets, setNearbyVets] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [searchRadius, setSearchRadius] = useState(5000);
  const [selectedVetDetails, setSelectedVetDetails] = useState(null);
  const { user } = useAuth();

  const services = ['General Checkup', 'Vaccination', 'Dental Cleaning', 'Surgery Consultation'];

  const times = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const getCurrentLocation = async () => {
    setLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable location permissions to find nearby vets');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      const userLoc = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      
      setUserLocation(userLoc);
      return userLoc;
    } catch (error) {
      Alert.alert('Error', 'Failed to get your location: ' + error.message);
      return null;
    } finally {
      setLocationLoading(false);
    }
  };

  const searchNearbyVets = async () => {
    if (!userLocation) {
      const loc = await getCurrentLocation();
      if (!loc) return;
    }

    setLocationLoading(true);
    try {
      const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
      
      if (!API_KEY) {
        Alert.alert('Configuration Error', 'Google Maps API key is not configured');
        return;
      }

      const radius = searchRadius;
      const location = userLocation || await getCurrentLocation();
      
      const response = await fetch(
        https://maps.googleapis.com/maps/api/place/nearbysearch/json? +
        location=${location.latitude},${location.longitude} +
        &radius=${radius} +
        &type=veterinary_care +
        &keyword=veterinary|vet|animal+hospital +
        &key=${API_KEY}
      );

      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        const vetsWithDetails = await Promise.all(
          data.results.map(async (place) => {
            const detailsResponse = await fetch(
              https://maps.googleapis.com/maps/api/place/details/json? +
              place_id=${place.place_id} +
              &fields=name,formatted_address,formatted_phone_number,website,opening_hours,rating,reviews +
              &key=${API_KEY}
            );
            const detailsData = await detailsResponse.json();
            
            return {
              id: place.place_id,
              name: place.name,
              address: place.vicinity,
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
              rating: place.rating,
              totalRatings: place.user_ratings_total,
              vicinity: place.vicinity,
              details: detailsData.result,
              photoRef: place.photos?.[0]?.photo_reference,
            };
          })
        );
        
        setNearbyVets(vetsWithDetails);
        if (vetsWithDetails.length === 0) {
          Alert.alert('No Results', 'No veterinary clinics found in this area');
        }
      } else if (data.status === 'ZERO_RESULTS') {
        Alert.alert('No Results', 'No veterinary clinics found in this area. Try increasing the search radius.');
      } else {
        Alert.alert('Error', 'Failed to find nearby vets: ' + data.status);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to search for nearby vets: ' + error.message);
    } finally {
      setLocationLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const getDatesForNext14Days = () => {
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      if (date.getDay() !== 0) {
        dates.push(date);
      }
    }
    return dates;
  };

  const handleBookAppointment = async () => {
    if (!selectedVet || !selectedPet || !selectedService || !selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select all appointment details');
      return;
    }

    try {
      setLoading(true);
      const appointmentData = {
        vetClinic: selectedVet,
        vetDetails: selectedVetDetails,
        petName: selectedPet,
        service: selectedService,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        notes: '',
      };

      await createAppointment(user.uid, appointmentData);
      Alert.alert('Success', 'Appointment booked successfully!', [
        {
          text: 'OK',
          onPress: () => {
            setSelectedVet(null);
            setSelectedPet('Max');
            setSelectedService(null);
            setSelectedDate(null);
            setSelectedTime(null);
            setSelectedVetDetails(null);
            setShowMap(false);
          }
        }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to book appointment: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleSelectVet = (vet) => {
    setSelectedVet(vet.name);
    setSelectedVetDetails(vet);
    setShowMap(false);
  };

  return (
    <SafeAreaView style={styles.container}>
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
        
        <View style={styles.sectionCard}>
          <Text style={styles.label}>Find Nearby Veterinary Clinics</Text>
          
          <View style={styles.locationControls}>
            <TouchableOpacity 
              style={styles.locationButton}
              onPress={async () => {
                await getCurrentLocation();
                await searchNearbyVets();
                setShowMap(true);
              }}
            >
              <MaterialCommunityIcons name="map-search" size={20} color="#5ECDC5" />
              <Text style={styles.locationButtonText}>Find Nearby Vets</Text>
            </TouchableOpacity>

            <View style={styles.radiusControl}>
              <Text style={styles.radiusLabel}>Search Radius: {(searchRadius/1000).toFixed(1)} km</Text>
              <View style={styles.radiusButtons}>
                {[1, 2, 5, 10].map(km => (
                  <TouchableOpacity
                    key={km}
                    style={[styles.radiusChip, searchRadius === km * 1000 && styles.radiusChipActive]}
                    onPress={() => setSearchRadius(km * 1000)}
                  >
                    <Text style={[styles.radiusChipText, searchRadius === km * 1000 && styles.radiusChipTextActive]}>
                      {km}km
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {selectedVet && (
            <View style={styles.selectedVetInfo}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#5ECDC5" />
              <Text style={styles.selectedVetText}>Selected: {selectedVet}</Text>
            </View>
          )}
        </View>

        <Modal
          visible={showMap}
          transparent={false}
          animationType="slide"
          onRequestClose={() => setShowMap(false)}
        >
          <SafeAreaView style={styles.mapModalContainer}>
            <View style={styles.mapHeader}>
              <TouchableOpacity onPress={() => setShowMap(false)} style={styles.mapBackButton}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#1F395F" />
              </TouchableOpacity>
              <Text style={styles.mapHeaderTitle}>Nearby Veterinary Clinics</Text>
              <View style={{ width: 40 }} />
            </View>

            {locationLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#5ECDC5" />
                <Text style={styles.loadingText}>Finding nearby vets...</Text>
              </View>
            ) : (
              <>
                {userLocation && (
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                      latitude: userLocation.latitude,
                      longitude: userLocation.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                  >
                    {nearbyVets.map((vet) => (
                      <Marker
                        key={vet.id}
                        coordinate={{
                          latitude: vet.latitude,
                          longitude: vet.longitude,
                        }}
                        title={vet.name}
                        description={`${vet.rating || 'No'} ★ - ${vet.vicinity}`}
                        onPress={() => handleSelectVet(vet)}
                      >
                        <View style={styles.markerContainer}>
                          <MaterialCommunityIcons name="hospital-building" size={30} color="#5ECDC5" />
                        </View>
                      </Marker>
                    ))}
                  </MapView>
                )}

                <ScrollView style={styles.vetListContainer} showsVerticalScrollIndicator={false}>
                  <Text style={styles.vetListTitle}>Veterinary Clinics Near You</Text>
                  {nearbyVets.map((vet) => (
                    <TouchableOpacity
                      key={vet.id}
                      style={[styles.vetCard, selectedVet === vet.name && styles.vetCardActive]}
                      onPress={() => handleSelectVet(vet)}
                    >
                      <View style={styles.vetCardHeader}>
                        <MaterialCommunityIcons name="storefront" size={24} color="#5ECDC5" />
                        <View style={styles.vetCardInfo}>
                          <Text style={styles.vetName}>{vet.name}</Text>
                          <View style={styles.ratingContainer}>
                            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                            <Text style={styles.ratingText}>
                              {vet.rating || 'New'} ({vet.totalRatings || 0} reviews)
                            </Text>
                          </View>
                        </View>
                        {userLocation && (
                          <View style={styles.distanceBadge}>
                            <Text style={styles.distanceText}>
                              {calculateDistance(
                                userLocation.latitude,
                                userLocation.longitude,
                                vet.latitude,
                                vet.longitude
                              )} km
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.vetAddress}>{vet.address}</Text>
                      {vet.details?.formatted_phone_number && (
                        <View style={styles.contactInfo}>
                          <MaterialCommunityIcons name="phone" size={14} color="#666" />
                          <Text style={styles.contactText}>{vet.details.formatted_phone_number}</Text>
                        </View>
                      )}
                      {vet.details?.opening_hours && (
                        <View style={styles.contactInfo}>
                          <MaterialCommunityIcons name="clock-outline" size={14} color="#666" />
                          <Text style={styles.contactText}>
                            {vet.details.opening_hours.open_now ? 'Open Now' : 'Closed'}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}
          </SafeAreaView>
        </Modal>

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

        <View style={styles.sectionCard}>
          <Text style={styles.label}>Select Service</Text>
          {services.map((service) => (
            <TouchableOpacity 
              key={service} 
              style={[
                styles.selectionItem,
                selectedService === service && styles.selectionItemActive
              ]}
              onPress={() => setSelectedService(service)}
            >
              <MaterialCommunityIcons 
                name={selectedService === service ? "check-circle" : "circle-outline"} 
                size={20} 
                color={selectedService === service ? "#5ECDC5" : "#1F395F"} 
              />
              <Text style={styles.selectionText}>{service}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity 
            style={styles.dateTimeButton}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialCommunityIcons name="calendar" size={20} color="#5ECDC5" />
            <Text style={styles.dateTimeButtonText}>
              {selectedDate ? formatDate(selectedDate) : 'Choose a date'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.label}>Select Time</Text>
          <View style={styles.timeGrid}>
            {times.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotActive
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeSlotText,
                  selectedTime === time && styles.timeSlotTextActive
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.confirmButton, loading && styles.confirmButtonDisabled]}
          onPress={handleBookAppointment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showDatePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#1F395F" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.datePickerScroll}>
              {getDatesForNext14Days().map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateOption,
                    selectedDate?.toDateString() === date.toDateString() && styles.dateOptionActive
                  ]}
                  onPress={() => {
                    setSelectedDate(date);
                    setShowDatePicker(false);
                  }}
                >
                  <Text style={[
                    styles.dateOptionText,
                    selectedDate?.toDateString() === date.toDateString() && styles.dateOptionTextActive
                  ]}>
                    {formatDate(date)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 25, paddingTop: 40, paddingBottom: 50 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: 'white', opacity: 0.9, fontSize: 14 },

  scrollContent: { padding: 15, marginTop: -30, paddingBottom: 40 },

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

  selectionItemActive: {
    backgroundColor: '#E0F2F1',
  },

  selectionText: {
    marginLeft: 10,
    color: '#1F395F',
    fontSize: 14,
    fontWeight: '500',
  },

  chipRow: { flexDirection: 'row', gap: 10 },
  chip: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  chipActive: { backgroundColor: '#5ECDC5', borderWidth: 1, borderColor: '#5ECDC5' },
  chipText: { color: '#1F395F', fontWeight: '500' },
  chipTextActive: { color: 'white', fontWeight: 'bold' },

  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  dateTimeButtonText: {
    marginLeft: 15,
    color: '#1F395F',
    fontSize: 14,
    fontWeight: '500',
  },

  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  timeSlot: {
    width: '30%',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  timeSlotActive: {
    backgroundColor: '#5ECDC5',
  },

  timeSlotText: {
    color: '#1F395F',
    fontWeight: '500',
    fontSize: 12,
  },

  timeSlotTextActive: {
    color: 'white',
  },

  confirmButton: {
    backgroundColor: '#5ECDC5',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 40,
  },

  confirmButtonDisabled: {
    opacity: 0.6,
  },

  confirmButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F395F',
  },

  datePickerScroll: {
    padding: 15,
  },

  dateOption: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  dateOptionActive: {
    backgroundColor: '#5ECDC5',
  },

  dateOptionText: {
    color: '#1F395F',
    fontSize: 16,
    fontWeight: '500',
  },

  dateOptionTextActive: {
    color: 'white',
  },

  locationControls: {
    gap: 15,
  },

  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5ECDC5',
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },

  locationButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  radiusControl: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
  },

  radiusLabel: {
    fontSize: 14,
    color: '#1F395F',
    marginBottom: 10,
    fontWeight: '500',
  },

  radiusButtons: {
    flexDirection: 'row',
    gap: 10,
  },

  radiusChip: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5ECDC5',
  },

  radiusChipActive: {
    backgroundColor: '#5ECDC5',
  },

  radiusChipText: {
    color: '#5ECDC5',
    fontWeight: '500',
  },

  radiusChipTextActive: {
    color: 'white',
  },

  selectedVetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    gap: 10,
  },

  selectedVetText: {
    color: '#1F395F',
    fontWeight: '500',
    flex: 1,
  },

  mapModalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: 'white',
  },

  mapBackButton: {
    padding: 5,
  },

  mapHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F395F',
  },

  map: {
    width: width,
    height: height * 0.5,
  },

  markerContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: '#5ECDC5',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    color: '#1F395F',
    fontSize: 16,
  },

  vetListContainer: {
    flex: 1,
    padding: 15,
  },

  vetListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F395F',
    marginBottom: 15,
  },

  vetCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  vetCardActive: {
    borderColor: '#5ECDC5',
    backgroundColor: '#E0F2F1',
  },

  vetCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  vetCardInfo: {
    flex: 1,
    marginLeft: 12,
  },

  vetName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F395F',
    marginBottom: 4,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ratingText: {
    fontSize: 12,
    color: '#666',
  },

  distanceBadge: {
    backgroundColor: '#5ECDC5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  distanceText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  vetAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },

  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },

  contactText: {
    fontSize: 12,
    color: '#666',
  },
});

export default Book;

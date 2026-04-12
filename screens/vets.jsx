import React from 'react';
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

const Vets = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient 
        colors={['#5ECDC5', '#3e5974']} 
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.headerTitle}>Nearby Veterinarians</Text>
        <Text style={styles.headerSubtitle}>Find the best care for your pet</Text>
      </LinearGradient>

      <View style={styles.mapPlaceholder}>
        <View style={styles.locationButton}>
          <MaterialCommunityIcons name="near-me" size={20} color="#5ECDC5" />
        </View>
        <MaterialCommunityIcons name="map-marker-radius" size={60} color="#5ECDC5" />
        <Text style={styles.mapText}>Interactive map would display here</Text>
        <Text style={styles.mapSubtext}>Showing 4 nearby locations</Text>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Veterinarians Near You</Text>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.clinicName}>Happy Paws Veterinary Clinic</Text>
                <Text style={styles.specialty}>General Care</Text>
              </View>
              <View style={styles.ratingBadge}>
                <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="map-marker-outline" size={16} color="#5ECDC5" />
              <Text style={styles.address}>123 Main St, Downtown</Text>
            </View>

            <View style={styles.cardBottom}>
              <Text style={styles.distanceText}>0.5 km  •  <MaterialCommunityIcons name="phone" size={14} /> +1 (555) 123-4567</Text>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.clinicName}>Pet Care Center</Text>
                <Text style={styles.specialty}>Emergency Care</Text>
              </View>
              <View style={styles.ratingBadge}>
                <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.6</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="map-marker-outline" size={16} color="#5ECDC5" />
              <Text style={styles.address}>456 Oak Ave, Riverside</Text>
            </View>

            <View style={styles.cardBottom}>
              <Text style={styles.distanceText}>1.2 km  •  <MaterialCommunityIcons name="phone" size={14} /> +1 (555) 234-5678</Text>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#E0F2F1' 
},

  header: { padding: 25, 
    paddingTop: 40 },

  headerTitle: { 
    color: 'white', 
    fontSize: 22, 
    fontWeight: 'bold' },
  headerSubtitle: { 
    color: 'white', 
    opacity: 0.9, 
    fontSize: 14 },
  
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  locationButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    elevation: 3,
  },
  mapText: { color: '#3e5974', 
    marginTop: 10, 
    fontWeight: '500' 
},

  mapSubtext: { color: '#8a8787', 
    fontSize: 12 
},

  listContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  listTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1F395F', 
    marginBottom: 15 },

  scrollContent: { 
    paddingBottom: 100 
}, 

  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardTop: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10 },

  clinicName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1F395F' },

  specialty: { 
    color: '#8a8787', 
    fontSize: 13 },

  ratingBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF9E6', 
    paddingHorizontal: 8, 
    borderRadius: 12,
    height: 24
  },

  ratingText: { 
    marginLeft: 4, 
    fontWeight: 'bold', 
    color: '#1F395F' },

  infoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 },

  address: { 
    marginLeft: 5, 
    color: '#8a8787', 
    fontSize: 13 },
  
  cardBottom: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10
  },

  distanceText: { 
    color: '#5ECDC5', 
    fontSize: 13, 
    fontWeight: '500' },

  bookButton: { 
    backgroundColor: '#5ECDC5', 
    paddingHorizontal: 20, 
    paddingVertical: 8, 
    borderRadius: 10 },

  bookButtonText: { color: 'white', 
    fontWeight: 'bold' }
});

export default Vets;